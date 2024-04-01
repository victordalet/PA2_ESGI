import random
import json
import pickle
import numpy as np

import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model


class ChatBot:
    lemmatizer: WordNetLemmatizer
    intents: dict
    words: list
    classes: list
    model: load_model
    ERROR_THRESHOLD = 0.25

    def __init__(self):
        self.download_nltk_data()
        self.lemmatizer = WordNetLemmatizer()
        self.intents = json.loads(open('data.json').read())
        self.words = pickle.load(open('saves/words.pkl', 'rb'))
        self.classes = pickle.load(open('saves/classes.pkl', 'rb'))
        self.model = load_model('saves/chatbot_model.model')

    @staticmethod
    def download_nltk_data():
        nltk.download('punkt')
        nltk.download('wordnet')

    def clean_up_sentence(self, sentence):
        sentence_words = nltk.word_tokenize(sentence)
        sentence_words = [self.lemmatizer.lemmatize(word)
                          for word in sentence_words]
        return sentence_words

    def bag_of_words(self, sentence):
        sentence_words = self.clean_up_sentence(sentence)
        bag = [0] * len(self.words)
        for w in sentence_words:
            for i, word in enumerate(self.words):
                if word == w:
                    bag[i] = 1
        return np.array(bag)

    def predict_class(self, sentence):
        bow = self.bag_of_words(sentence)
        res = self.model.predict(np.array([bow]))[0]
        results = [[i, r]
                   for i, r in enumerate(res)
                   if r > self.ERROR_THRESHOLD]
        results.sort(key=lambda x: x[1], reverse=True)
        return_list = []
        for r in results:
            return_list.append({'intent': self.classes[r[0]],
                                'probability': str(r[1])})
        return return_list

    def get_response(self, intents_list):
        intents_json = self.intents
        tag = intents_list[0]['intent']
        list_of_intents = intents_json['intents']
        for i in list_of_intents:
            if i['tag'] == tag:
                result = random.choice(i['responses'])
                break
        return result

    def test(self):
        while True:
            message = input("")
            ints = self.predict_class(message)
            res = self.get_response(ints)
            print(res)
