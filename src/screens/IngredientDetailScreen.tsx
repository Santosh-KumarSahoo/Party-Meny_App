import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import ingredientsData from '../data/ingredients.json';

const IngredientDetailScreen = ({ route }) => {
  const { dish } = route.params || { dish: {} };
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (dish && dish.id) {
      const found = ingredientsData.find((i) => i.dishId === dish.id);
      setIngredients(found ? found.ingredients : []);
    }
  }, [dish]);

  return (
    <SafeAreaView style={styles.container}>
      {dish.image ? (
        <Image source={{ uri: dish.image }} style={styles.dishImage} />
      ) : null}
      <Text style={styles.title}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingredientRow}>
            <Text style={styles.ingredientName}>{item.name}</Text>
            <Text style={styles.ingredientQty}>{item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No ingredients found.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  dishImage: { width: '100%', height: 180, borderRadius: 16, marginBottom: 16, resizeMode: 'cover' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 16, color: '#555', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  ingredientRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  ingredientName: { fontSize: 16 },
  ingredientQty: { fontSize: 16, color: '#888' },
  emptyText: { color: '#aaa', textAlign: 'center', marginTop: 32 },
});

export default IngredientDetailScreen;
