import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import { FONTS, SIZES, COLORS, icons, dummyData } from '../../constants';
import HorizontalFoodCard from '../../components/HorizontalFoodCard';
import VerticalFoodCard from '../../components/VerticalFoodCard';

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.sectionShowAll}>Show All</Text>
        </TouchableOpacity>
      </View>
      {/* Content */}
      {children}
    </View>
  );
};

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [menuList, setMenuList] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  const handleChangeCategory = (categoryId, menuTypeId) => {
    // Retrieve the popular  menu
    let selectedPopular = dummyData.menu.find(a => a.name === 'Popular');

    // Retrieve the recommended menu
    let selectedRecommended = dummyData.menu.find(
      a => a.name === 'Recommended',
    );
    // console.log('selectedRecommended: ', selectedRecommended.list);

    // Find the menu based on the menuTypeId
    let selectedMenu = dummyData.menu.find(a => a.id === menuTypeId);

    // Set the popular menu based on the categoryId
    setPopular(
      selectedPopular?.list.filter(a => a.categories.includes(categoryId)),
    );

    // Set the recommended menu based on the categoryId
    setRecommends(
      selectedRecommended?.list.filter(a => a.categories.includes(categoryId)),
    );

    // set the menu based on the categoryId
    setMenuList(
      selectedMenu.list.filter(a => a.categories.includes(categoryId)),
    );
  };

  const renderSearch = () => {
    return (
      <View style={styles.containerSearch}>
        {/* Icon */}
        <Image style={styles.iconSearch} source={icons.search} />
        {/* Text Input */}
        <TextInput
          style={styles.textInputSearch}
          placeholder="search food..."
        />
        {/* Filter Button */}
        <TouchableOpacity>
          <Image source={icons.filter} style={styles.iconFilter} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMenuTypes = () => {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              {
                marginRight:
                  index == dummyData.menu.length - 1 ? SIZES.padding : 0,
              },
              styles.btnHeaderItem,
            ]}
            onPress={() => {
              setSelectedMenuType(item.id);
              handleChangeCategory(selectedCategoryId, item.id);
            }}>
            <Text
              style={{
                color:
                  selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                ...FONTS.h3,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderRecommendedSection = () => {
    return (
      <Section
        title={'Recommended'}
        onPress={() => console.log('Show all recommended')}>
        <FlatList
          data={recommends}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <HorizontalFoodCard
                containerStyle={{
                  ...styles.containerStyleSectionFood,
                  marginLeft: index === 0 ? SIZES.padding : 18,
                  marginRight:
                    index === recommends.length - 1 ? SIZES.padding : 0,
                }}
                imageStyle={styles.imageStyleSectionFood}
                item={item}
                onPress={() => console.log('HorizontalFoodCard Section')}
              />
            );
          }}
        />
      </Section>
    );
  };

  const renderPopularSection = () => {
    return (
      <Section
        title={'Popular Near You'}
        onPress={() => {
          console.log('Show all popular items');
        }}>
        <FlatList
          data={popular}
          keyExtractor={item => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => (
            <VerticalFoodCard
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : 18,
                padding: 18,
                marginRight:
                  index === recommends.length - 1 ? SIZES.padding : 0,
              }}
              item={item}
              onPress={() => console.log('Vertical Food Card')}
            />
          )}
        />
      </Section>
    );
  };

  const renderFoodCategories = () => {
    return (
      <FlatList
        data={dummyData.categories}
        horizontal
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              height: 55,
              flexDirection: 'row',
              marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
              marginRight: index === recommends.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor:
                selectedCategoryId == item.id
                  ? COLORS.primary
                  : COLORS.lightGray2,
            }}
            onPress={() => {
              setSelectedCategoryId(item.id);
              handleChangeCategory(item.id, selectedMenuType);
            }}>
            <Image
              source={item.icon}
              style={{ marginTop: 5, height: 50, width: 50 }}
            />
            <Text
              style={{
                alignSelf: 'center',
                marginRight: SIZES.base,
                color:
                  selectedCategoryId == item.id
                    ? COLORS.white
                    : COLORS.darkGray,
                ...FONTS.h3,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderDeliveryTo = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
        }}>
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.body3,
          }}>
          DELIVERY TO
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            alignItems: 'center',
          }}>
          <Text style={{ ...FONTS.h3 }}>{dummyData.myProfile.address}</Text>
          <Image
            source={icons.down_arrow}
            style={{ marginLeft: SIZES.base, height: 20, width: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search */}
      {renderSearch()}
      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Delivery To */}
            {renderDeliveryTo()}

            {/*Food Categories */}
            {renderFoodCategories()}
            {/* Popular */}
            {renderPopularSection()}

            {/* Recommended */}
            {renderRecommendedSection()}
            {/* Menu Type */}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              containerStyle={styles.containerStyleHorizontalFood}
              imageStyle={styles.imageStyleHorizontalFood}
              item={item}
              onPress={() => console.log('HorizontalFood: ', item)}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSearch: {
    flexDirection: 'row',
    ...Platform.select({
      android: { height: 50 },
      ios: { height: 40 },
    }),
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.base,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
  },
  iconSearch: {
    height: 20,
    width: 20,
    tintColor: COLORS.black,
  },
  iconFilter: {
    height: 20,
    width: 20,
    tintColor: COLORS.black,
  },
  textInputSearch: {
    flex: 1,
    marginLeft: SIZES.radius,
    ...FONTS.body3,
    ...Platform.select({
      android: { justifyContent: 'center', top: 2 },
    }),
  },
  containerStyleHorizontalFood: {
    height: 120,
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.radius,
  },
  imageStyleHorizontalFood: {
    marginTop: 20,
    height: 110,
    width: 110,
  },
  btnHeaderItem: {
    marginLeft: SIZES.padding,
  },
  sectionHeader: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    flex: 1,
    ...FONTS.h3,
  },
  sectionShowAll: {
    color: COLORS.primary,
    ...FONTS.body3,
  },
  containerStyleSectionFood: {
    height: 180,
    width: SIZES.width * 0.85,
    padding: 18,
    paddingRight: SIZES.radius,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  imageStyleSectionFood: {
    marginTop: 35,
    height: 150,
    width: 150,
  },
});

export default Home;
