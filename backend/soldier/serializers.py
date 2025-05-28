class SoldierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soldier
        fields = '__all__'
