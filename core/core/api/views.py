# Django Inbuilt imports
from ..models import Prediction
# rest_framework imports
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import PredictionSerializer
# third party imports
import json
import numpy as np
import pickle
import pandas as pd

# Creating APIView for React.js rendering
class predictPrice(APIView):
    def get(self, request):
        try:
            predict = Prediction.objects.all()
            predicSerialized = PredictionSerializer(predict, many=True).data
            return Response(data=predicSerialized, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data=e, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            mydata=request.data
            print(mydata)
            X = pd.read_csv('./core/assets/prepared_data.csv')
            X = X.drop('price', axis=1)
            with open('./core/assets/banglore_home_prices_model.pickle', 'rb') as m:
                model = pickle.load(m)
            loc_index = np.where(X.columns==request.data.get('location'))[0][0]
            print(loc_index)
            x = np.zeros(len(X.columns))
            print(x)
            x[0] = request.data.get('total_sqft')
            x[1] = request.data.get('bath')
            x[2] = request.data.get('bhk')
            if loc_index>=0:
                x[loc_index]=1
            print(x)
            result = round(model.predict([x])[0],2)
            print(result)
            data={
                'name' : request.data.get('name'),
                'total_sqft' : request.data.get('total_sqft'),
                'bath' : request.data.get('bath'),
                'bhk' : request.data.get('bhk'),
                'location' : request.data.get('location'),
                'price' : result
            }
            serializer = PredictionSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(data=e, status=status.HTTP_400_BAD_REQUEST)