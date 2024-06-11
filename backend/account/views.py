from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework import generics
from .models import MyUser,Connectivity
from .serializers import UserLoginSerializer, UserSerializer,AdminLoginSerializer,ConnectivitySerializer


# Create your views here.

class UserListCreateView(generics.ListCreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer


class CreateUser(APIView):
   def post(self,request):
      data=request.data
      serializer=UserSerializer(data=data)
      if serializer.is_valid():
         user=serializer.save()
         refresh = RefreshToken.for_user(user) 
         return Response({
            'message':"user created successfully",
            'access': str(refresh.access_token),
            'refresh': str(refresh),

            }, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ViewUser(APIView):
   def get(self,request):
      data=MyUser.objects.all()
      serializer=UserSerializer(data,many=True)
      return Response(serializer.data)

class UserLoginView(APIView):
   
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
           
            refresh = RefreshToken.for_user(user)
            return Response({
                  'message': 'Login successful',
                  'refresh': str(refresh),
                  'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AdminLoginView(APIView):
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        if serializer.is_valid():
            admin = serializer.validated_data['user']
           
            refresh = RefreshToken.for_user(admin)
            return Response({
                  'message': 'Login successful',
                  'refresh': str(refresh),
                  'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConnectivityView(APIView):
    def post(self,request):
        serializer=ConnectivitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def get(self,request,id=None):
        data=Connectivity.objects.filter(follower=id)
        serializer=ConnectivitySerializer(data,many=True)
        return Response(serializer.data)
    

def teamUp(request):
    if request.method=='POST':
        skills=request.POST.get('skills')
        user = MyUser.objects.filter(skills=skills)
    return render(request,'teamup.html')                                                        
