import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput, Image, Modal, Pressable } from 'react-native';
import dishesData from '../data/dishes.json';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = [
  { key: 'STARTER', label: 'Starter' },
  { key: 'MAIN COURSE', label: 'Main Course' },
  { key: 'DESSERT', label: 'Dessert' },
  { key: 'SIDES', label: 'Sides' },
];

const VegTag = ({ type }) => (
  <View style={[styles.vegTagBox, type === 'VEG' ? styles.vegBox : styles.nonVegBox]}>
    <View style={[styles.vegCircle, type === 'VEG' ? styles.vegCircleGreen : styles.vegCircleRed]} />
  </View>
);

const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('MAIN COURSE');
  const [search, setSearch] = useState('');
  const [vegFilter, setVegFilter] = useState(true);
  const [nonVegFilter, setNonVegFilter] = useState(true);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDish, setModalDish] = useState(null);
  const navigation = useNavigation();

  // Filtering logic
  const filteredDishes = dishesData.filter((dish) => {
    if (dish.mealType !== selectedCategory) return false;
    if (!vegFilter && dish.type === 'VEG') return false;
    if (!nonVegFilter && dish.type === 'NON_VEG') return false;
    if (search && !dish.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Count per category
  const getCategoryCount = (catKey) =>
    selectedDishes.filter((id) => {
      const dish = dishesData.find((d) => d.id === id);
      return dish && dish.mealType === catKey;
    }).length;

  // Add/Remove dish
  const toggleDish = (id) => {
    setSelectedDishes((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // DishCard component
  const DishCard = ({ item }) => {
    const isSelected = selectedDishes.includes(item.id);
    const isNonVeg = item.type === 'NON_VEG';
    return (
      <TouchableOpacity onPress={() => { setModalDish(item); setModalVisible(true); }} activeOpacity={0.9}>
        <View style={[
          styles.dishCard,
          isSelected && isNonVeg ? styles.dishCardNonVegSelected : null
        ]}>
          <Image
            source={{ uri: item.image || item.category?.image }}
            style={styles.dishImage}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Text style={styles.dishName}>{item.name}</Text>
              <VegTag type={item.type} />
            </View>
            <Text style={styles.dishDesc}>{item.description}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('IngredientDetail', { dish: item })}
            >
              <Text style={styles.ingredientLink}>Ingredient</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.addButton, isSelected ? styles.removeButton : null]}
            onPress={() => toggleDish(item.id)}
          >
            <Text style={isSelected ? styles.removeButtonText : styles.addButtonText}>
              {isSelected ? 'Remove' : 'Add +'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // Modal for item details
  const ItemModal = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {modalDish && (
            <>
              <Image source={{ uri: modalDish.image }} style={styles.modalImage} />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <Text style={styles.modalTitle}>{modalDish.name}</Text>
                <VegTag type={modalDish.type} />
              </View>
              <Text style={styles.modalDesc}><Text style={{ fontWeight: 'bold' }}>{modalDish.category?.name || ''} </Text>{modalDish.description}</Text>
              <TouchableOpacity
                style={[styles.addButton, selectedDishes.includes(modalDish.id) ? styles.removeButton : null, { alignSelf: 'flex-start', marginTop: 12 }]}
                onPress={() => toggleDish(modalDish.id)}
              >
                <Text style={selectedDishes.includes(modalDish.id) ? styles.removeButtonText : styles.addButtonText}>
                  {selectedDishes.includes(modalDish.id) ? 'Remove' : 'Add +'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalBtn}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ItemModal />
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search dish for your party..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Category Tabs */}
      <View style={styles.tabsContainer}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.tab,
              selectedCategory === cat.key && styles.tabSelected,
            ]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <Text style={selectedCategory === cat.key ? styles.tabTextSelected : styles.tabText}>
              {cat.label} <Text style={{ fontWeight: 'bold' }}>{getCategoryCount(cat.key)}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Veg / Non-Veg Filter */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setVegFilter((v) => !v)} style={[styles.filterButton, vegFilter && styles.filterActive]}>
          <Text style={vegFilter ? styles.filterTextActive : styles.filterText}>Veg</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNonVegFilter((v) => !v)} style={[styles.filterButton, nonVegFilter && styles.filterActive]}>
          <Text style={nonVegFilter ? styles.filterTextActive : styles.filterText}>Non-Veg</Text>
        </TouchableOpacity>
      </View>

      {/* Dish List */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DishCard item={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No dishes found.</Text>}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* Selection Summary and Continue Button */}
      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>
          Total Dish Selected <Text style={{ fontWeight: 'bold' }}>{selectedDishes.length}</Text>
        </Text>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchBar: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  tabSelected: {
    backgroundColor: '#ffb347',
  },
  tabText: {
    color: '#333',
    fontWeight: '500',
  },
  tabTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  filterButton: {
    marginHorizontal: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  filterActive: {
    backgroundColor: '#4caf50',
  },
  filterText: {
    color: '#333',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  dishCard: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dishCardNonVegSelected: {
    backgroundColor: '#ffeaea',
    borderWidth: 2,
    borderColor: '#e53935',
  },
  dishImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  dishDesc: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  ingredientLink: {
    color: '#ff9800',
    fontWeight: 'bold',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginLeft: 8,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#e53935',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  vegTagBox: {
    borderWidth: 1.5,
    borderRadius: 6,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  vegBox: {
    borderColor: '#4caf50',
  },
  nonVegBox: {
    borderColor: '#e53935',
  },
  vegCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  vegCircleGreen: {
    backgroundColor: '#4caf50',
  },
  vegCircleRed: {
    backgroundColor: '#e53935',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#aaa',
  },
  summaryBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    elevation: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#ffb347',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  modalImage: {
    width: 180,
    height: 120,
    borderRadius: 16,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  modalDesc: {
    fontSize: 15,
    color: '#444',
    marginTop: 8,
    marginBottom: 8,
  },
  closeModalBtn: {
    marginTop: 16,
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  closeModalText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default MenuScreen;
