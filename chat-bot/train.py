import random
import json
import pickle
import numpy as np
import sys

import nltk
from nltk.stem import WordNetLemmatizer

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import SGD


class Train:
    words: list
    classes: list
    documents: list
    ignore_letters: list
    training: list
    output_empty: list
    train_x: list
    train_y: list
    model: Sequential
    epochs: int

    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
        self.intents = json.loads(open('data.json').read())
        self.words = []
        self.classes = []
        self.documents = []
        self.training = []
        self.ignore_letters = ['?', '!']
        self.epochs = int(sys.argv[1])

    def run(self):
        self.download_nltk_data()
        self.load_training_data()
        self.prepare_training_data()
        self.build_neural_network()
        self.train()

    @staticmethod
    def download_nltk_data():
        nltk.download('punkt')
        nltk.download('wordnet')

    def load_training_data(self):
        for intent in self.intents['intents']:
            for pattern in intent['patterns']:
                word_list = nltk.word_tokenize(pattern)
                self.words.extend(word_list)
                self.documents.append((word_list, intent['tag']))
                if intent['tag'] not in self.classes:
                    self.classes.append(intent['tag'])

    def prepare_training_data(self):
        self.words = [self.lemmatizer.lemmatize(word)
                      for word in self.words
                      if word not in self.ignore_letters]

        self.words = sorted(set(self.words))
        self.classes = sorted(set(self.classes))
        pickle.dump(self.words, open('saves/words.pkl', 'wb'))
        pickle.dump(self.classes, open('saves/classes.pkl', 'wb'))

        self.output_empty = [0] * len(self.classes)
        for document in self.documents:
            bag = []
            word_patterns = document[0]
            word_patterns = [self.lemmatizer.lemmatize(word.lower())
                             for word in word_patterns]
            for word in self.words:
                bag.append(1) if word in word_patterns else bag.append(0)

            output_row = list(self.output_empty)
            output_row[self.classes.index(document[1])] = 1
            self.training.append([bag, output_row])

        random.shuffle(self.training)
        self.training = np.array(self.training)

        self.train_x = list(self.training[:, 0])
        self.train_y = list(self.training[:, 1])

    def build_neural_network(self):
        self.model = Sequential()
        self.model.add(Dense(128, input_shape=(len(self.train_x[0]),),
                             activation='relu'))
        self.model.add(Dropout(0.5))
        self.model.add(Dense(64, activation='relu'))
        self.model.add(Dropout(0.5))
        self.model.add(Dense(len(self.train_y[0]), activation='softmax'))

        sgd = SGD(lr=0.01, momentum=0.9, nesterov=True)
        self.model.compile(loss='categorical_crossentropy',
                           optimizer=sgd,
                           metrics=['accuracy'])

    def train(self):
        self.model.fit(np.array(self.train_x),
                       np.array(self.train_y),
                       epochs=self.epochs,
                       batch_size=5,
                       verbose=1)
        self.model.save('saves/chatbot_model.model')


if __name__ == "__main__":
    Train().run()
