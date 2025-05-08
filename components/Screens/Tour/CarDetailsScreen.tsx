import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { generalStyles } from '../../design/shortened/generalStyles';
import { FadeUpView } from '../../design/FadeUpView';
import { CRText } from '../../design/CRText';
import { cars } from '../../utils/static/cars';
import { crHeight, crWidth } from '../../design/shortened/Dimensions';
import { TealButton } from '../../design/Buttons/TealButton';
import { useCRStore } from '../../../store';

export default function CarDetailsScreen({route,navigation}) {
    const { id } = route.params;


    const {setTourPackage}=useCRStore()
        const handleSelect =(carId:number)=>{
    setTourPackage({tourCar:carId})
    navigation.navigate('touroptions')
        }
  return (
  	<SafeAreaView
			style={generalStyles.safeArea}
			edges={["right", "left", "bottom"]}
		>
			<View style={styles.container}>
				<FadeUpView delay={300}>
					{/* Main Image */}
                <ScrollView  stickyHeaderIndices={[0]}
  //style={{ height: crHeight * 0.8 }}
  contentContainerStyle={{ paddingBottom: 100 }} >
	{/* Sticky Header at index 0 */}
	<View style={styles.imageContainer}>
		<Image
			source={{ uri: cars[id]?.image }}
			style={styles.headerImage}
		/>
	</View>

	{/* Title and Distance */}
	<View style={styles.headerInfo}>
		<CRText font='Jura' weight='bold'>{cars[id]?.name}</CRText>
	</View>

	{/* Description */}
	<View style={styles.descriptionContainer}>
		<CRText style={styles.descriptionText}>
			{cars[id]?.description}
		</CRText>
	</View>

</ScrollView>

					

					
				</FadeUpView>
				<View style={[generalStyles.generalBottom, { gap: 10 }]}>
			
					
					<TealButton title="Choose this ride" onPress={()=>handleSelect(id)} />
				</View>
			</View>
		</SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 8,
    },
    imageContainer: {
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 16,
        marginTop: 10,
    },
    headerImage: {
        width: '100%',
        height: 330,
        borderRadius: 5,
    },
    headerInfo: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    
    },
    distance: {
        fontSize: 16,
        color: "#666",
        marginTop: 4,
        fontFamily: "Karla",
    },
    descriptionContainer: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 22,
        color: "#555",
        fontFamily: "Karla",
    },
    similarPlacesSection: {
        marginTop: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 16,
        marginBottom: 12,
        color: "#333",
    
    },
    similarPlacesContainer: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    similarPlaceCard: {
        width: 120,
        marginRight: 8,
    },
    similarPlaceImage: {
        width: 120,
        height: 80,
        borderRadius: 8,
    },
    similarPlaceName: {
        fontSize: 12,
        marginTop: 4,
        color: "#666",
        fontFamily: "Karla",
    },
    visitButton: {
        backgroundColor: "#009688",
        paddingVertical: 16,
        borderRadius: 24,
        marginHorizontal: 16,
        marginTop: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    visitButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
   
    },
    bottomIndicator: {
        alignItems: "center",
        marginVertical: 24,
    },
    indicatorLine: {
        width: 40,
        height: 4,
        backgroundColor: "#D0D0D0",
        borderRadius: 2,
    },
});