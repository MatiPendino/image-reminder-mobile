import { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { 
  BannerAd, TestIds, InterstitialAd, AdEventType 
} from "react-native-google-mobile-ads";
import IndexNavbar from "../components/IndexNavbar";
import AlarmCard from "../components/AlarmCard";
import { useAlarms } from "../hooks/useAlarms";

const adUnitIdBanner: string = __DEV__ ? TestIds.BANNER : process.env.BANNER_AD_ID;
const adUnitIdInterst: string = __DEV__ ? TestIds.INTERSTITIAL : process.env.INTERSTITIAL_AD_ID;
const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterst);

export default function Home ({}) {
  const { data, error, isLoading, refetch } = useAlarms();

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      showAd()
    });
      
    interstitial.load();
      
    return unsubscribe;
  }, []);
        
  const showAd = () => {
    interstitial.show();
  };

  if (error) return <Text>Error: {error.message}</Text>;
  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <IndexNavbar />

      <FlatList
        data={data}
        contentContainerStyle={styles.listContainer}
        renderItem={({item, index}) => (
          <AlarmCard key={index}
            alarm={item}
            onDeleted={refetch}
          />
        )}
      />
      
      <BannerAd
        unitId={adUnitIdBanner}
        size="320x50"
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#666",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    marginTop: 10
  }
});
