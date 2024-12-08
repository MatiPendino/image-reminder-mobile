import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { BannerAd, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import api from '../services/api';
import IndexNavbar from '../components/IndexNavbar';
import AlarmCard from '../components/AlarmCard';
import { getDeviceId } from "../utils/getDeviceId";
import { AlarmProps } from '../types';

const adUnitIdBanner: string = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/6300978111';
const adUnitIdInterst: string = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3984939241340358/5721068336';
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

  const [alarms, setAlarms] = useState<AlarmProps[]>([])
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false)
  useEffect(() => {
    const getAlarms = async (): Promise<void> => {
    try {
      const id: string = await getDeviceId();
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
      setIsDataUpdated(false)
    }
    }

    getAlarms()
  }, [isDataUpdated])

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
          setIsDataUpdated={setIsDataUpdated}
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
