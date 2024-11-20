import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { BannerAd, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import api from '../services/api';
import IndexNavbar from '../components/IndexNavbar';
import AlarmCard from '../components/AlarmCard';
import { getDeviceId } from "../utils/getDeviceId";

const adUnitIdBanner = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/6300978111';
const adUnitIdInterst = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3984939241340358/5721068336';
const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterst);

export default function Home ({}) {
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

  const [alarms, setAlarms] = useState([])
  const [dataUpdated, setDataUpdated] = useState(false)
  useEffect(() => {
    const getAlarms = async () => {
    try {
      const id = await getDeviceId();
      const response = await api.get('/alarms/alarm/', {
        headers: {
          'Device-ID': id
        }
      })
      const data = response.data
      setAlarms([...data])
    } catch (err) {
      console.log("error:", err)
    } finally {
      setDataUpdated(false)
    }
    }

    getAlarms()
  }, [dataUpdated])

  return (
    <View style={styles.container}>
      <IndexNavbar />
      <FlatList
        data={alarms}
        contentContainerStyle={styles.listContainer}
        renderItem={({item, index}) => (
        <AlarmCard 
          key={index}
          alarm={item}
          setDataUpdated={setDataUpdated}
        />
        )}
      />
      <BannerAd
        unitId={adUnitIdBanner}
        size="320x50"
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => {
          console.error('Ad failed to load: ', error);
        }}
      />
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    marginTop: 10
  }
});
