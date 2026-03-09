import {Image} from 'expo-image';
import {Platform, StyleSheet, Text, View} from 'react-native';


import ParallaxScrollView from '@/components/parallax-scroll-view';
import {ThemedText} from '@/components/themed-text';
import {ThemedView} from '@/components/themed-view';
import {Link} from 'expo-router';
import {useEffect} from "react";
import axios from "axios";
import {IGenericResponse} from "@/types/IGenericResponse";
import {ICategoryResponse} from "@/types/ICategoryResponse";
import {useGetCategoriesQuery} from "@/services/categoryApi";
import {IMAGES_URL} from "@/constants/urls";

export default function HomeScreen() {

    useEffect(() => {
        loadDatCategories();
        // console.log("---Hello World---");
        },[]);

    const {data: loadData, isLoading} = useGetCategoriesQuery()

    const loadDatCategories = async () => {
        try {
            const result =
                await axios.get<IGenericResponse<ICategoryResponse>[]>("https://pd421.itstep.click/api/categories");
            const {data} =  result.data;
            console.log("---Categories---", data);
        }catch (error) {
            console.log("--У нас проблеми Хюстон--",error);
        }
    }
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <View className={"flex flex-row justify-center items-center"}>
                <Text className={"text-green-500 text-4xl"}>Привіт</Text>
                <Text className={"text-red-700 text-3xl"}>Козаки</Text>
            </View>



            <ThemedView className="px-5 pt-5 flex-row flex-wrap justify-between">
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    loadData?.data?.map((category: ICategoryResponse) => (

                        <View
                            key={category.id}
                            className="bg-white dark:bg-neutral-900 rounded-2xl shadow w-[48%] mb-4 overflow-hidden"
                        >
                            <Image
                                source={{ uri: IMAGES_URL + `/${category.image}` }}
                                contentFit="cover"
                                style={{ width: '100%', height: 128 }}
                                onError={(e) => console.log('Image error:', e)}
                            />

                            <View className="p-3">
                                <Text className="font-bold text-base dark:text-white">
                                    {category.name}
                                </Text>
                                <Text className="text-gray-500 text-sm mt-1" numberOfLines={3}>
                                    {category.description}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
