from rest_framework import serializers # type: ignore
from account.models import MyUser,Connectivity
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model=MyUser
      fields=['id','username','first_name','last_name','email','password','profile_pic']

   def create(self, validated_data):
        user = MyUser.objects.create_user(**validated_data)
        return user
   

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    msg = 'User account is disabled.'
                    raise serializers.ValidationError(msg)
            else:
                msg = 'invalid creadesnitials'
                raise serializers.ValidationError(msg)
        else:
            msg = 'username and password required'
            raise serializers.ValidationError(msg)
        return data
    

class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)
        if username and password:
            print(username,password)
            user = authenticate(username=username, password=password)
            if user:
                if user.is_superuser:
                    data['user'] = user
                else:
                    msg = 'user is not admin'
                    raise serializers.ValidationError(msg)
            else:
                msg = 'invalid creadesnitials'
                raise serializers.ValidationError(msg)
        else:
            msg = 'username and password required'
            raise serializers.ValidationError(msg)
        return data

class ConnectivitySerializer(serializers.ModelSerializer):
    class Meta:
        model=Connectivity
        fields="__all__"
         
         