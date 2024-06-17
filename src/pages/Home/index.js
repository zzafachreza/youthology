import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import KulitBerjerawat from '../../assets/KulitBerjerawat.svg'
import KulitKusam from '../../assets/KulitKusam.svg'
import KulitKendur from '../../assets/KulitKendur.svg'
import FlekHitam from '../../assets/FlekHitam.svg'
import { MyButton, MyGap, MyIcon } from '../../components';
import CountDown from 'react-native-countdown-component';
import MyCarouser from '../../components/MyCarouser';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import { Toast, useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function Home({ navigation, route }) {

  const toast = useToast();

  const [user, setUser] = useState({});
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [dataJawdal, setDataJadwal] = useState([
    {
      nama_perawatan: 'Milky Laser Booster',
      tanggal_janji: '2024-06-23',
      jam_janji: '09:00',
    },
  ])

  const [dataArtikel, setDataArtikel] = useState([]);
  const [dataKulit, setDataKulit] = useState([]);


  const REWARD = [20, 25, 30, 35, 40, 45, 50];
  const isFocus = useIsFocused();


  useEffect(() => {
    __GetDataArtikel();
    __GetDataKulit();

    if (isFocus) {
      __getJadwal();
      __GetUserProfile();
    }

  }, [isFocus]);

  const __GetDataArtikel = () => {
    axios.post(apiURL + 'artikel', {
      limit: 3,
      tipe: 'Regular'
    }).then(res => {
      console.log(res.data);
      setDataArtikel(res.data);
    })
  }

  const __GetDataKulit = () => {
    axios.post(apiURL + 'artikel', {
      tipe: 'Masalah Kulit'
    }).then(res => {
      console.log(res.data);
      setDataKulit(res.data);
    })
  }

  const __GetUserProfile = () => {
    getData('user').then(uu => {
      axios.post(apiURL + 'user_data', {
        id: uu.id
      }).then(res => {
        console.log(res.data);
        storeData('user', res.data)
        setUser(res.data);
      })
    })
  }


  const __getJadwal = () => {
    getData('user').then(uu => {
      axios.post(apiURL + 'appointment', {
        fid_user: uu.id
      }).then(res => {
        console.log('jadwal', res.data);
        setDataJadwal(res.data);
      })
    })
  }




  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: Color.white[900]
    }}>
      <StatusBar backgroundColor={Color.primary[900]} barStyle="light-content" />
      {/* header */}
      <View style={{
        height: 80,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.primary[900]
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Image source={{
            uri: user.foto_user
          }} style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }} />
          <Text style={{
            left: 12,
            flex: 1,
            ...fonts.headline4,
            color: Color.white[900]
          }}>Halo, {user.nama_lengkap}</Text>
        </View>
        <View style={{
          flex: 0.6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Member')}>
            <Image source={user.member == 'Silver' ? require('../../assets/badgeSilver.png') : user.member == 'Gold' ? require('../../assets/badgeGold.png') : require('../../assets/badgePlatinum.png')} style={{
              width: 100,
              resizeMode: 'contain',
              height: 35
            }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible2(true)} style={{
            width: 40,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#FFFFFF1F',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <MyIcon name='bell' size={24} color={Color.white[900]} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SEARCH */}
        <View style={{
          height: 160,
          padding: 16,
          backgroundColor: Color.primary[900]
        }}>
          <Text style={{
            ...fonts.body3,
            color: Color.white[900],
            marginBottom: 4
          }}>Selamat datang di Youthology Clinic</Text>
          <Text style={{
            ...fonts.headline2,
            color: Color.white[900],
            marginBottom: 12
          }}>Define Beauty, Define You</Text>
          <TouchableWithoutFeedback>
            <View style={{
              height: 50,
              backgroundColor: Color.white[900],
              borderRadius: 8,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <MyIcon name='magnifer' size={20} color={Color.blueGray[300]} />
              <Text style={{
                ...fonts.body3,
                left: 8,
                color: Color.blueGray[400],
              }}>Cari treatment</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* FLASH SALE */}
        <View>
          <View style={{
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{
              flex: 1,
              ...fonts.headline4,
              color: Color.blueGray[900]
            }}>Flash Sale!</Text>
            <View style={{
              // flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{

                ...fonts.caption1,
                color: Color.blueGray[900],
                marginRight: 5,
              }}>Berakhir dalam</Text>
              <CountDown
                until={1000 * 10 + 30}
                size={15}
                showSeparator
                separatorStyle={{
                  marginHorizontal: 4,
                  color: Color.blueGray[400],

                }}
                onFinish={() => alert('Finished')}
                digitStyle={{ backgroundColor: Color.red[500] }}
                digitTxtStyle={{ color: Color.white[900] }}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{ h: null, m: null, s: null }}
              />
            </View>
          </View>
          <MyCarouser />
        </View>
        {/* MASALAH KULIT*/}
        <View style={{
          padding: 16,
        }}>
          <Text style={{
            ...fonts.headline4,
            color: Color.blueGray[900]
          }}>Masalah Kulitmu</Text>
          <FlatList contentContainerStyle={{
            flex: 0.5,
            justifyContent: 'space-around',
            marginVertical: 10,
          }} data={dataKulit} numColumns={2} renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Treatment', {
                judul: item.judul
              })} style={{

                overflow: 'hidden'
              }}>

                <ImageBackground source={require('../../assets/bgkulit.png')} style={{
                  height: 60,
                  width: windowWidth / 2.2,
                  marginHorizontal: 2,
                  borderRadius: 12,
                  marginVertical: 4,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>

                  <Text style={{
                    flex: 1,
                    ...fonts.headline5,
                    color: Color.white[900]
                  }}>{item.judul}</Text>
                  <Image source={{
                    uri: item.image
                  }} style={{
                    width: 30,
                    height: 30,
                  }} />
                </ImageBackground>

              </TouchableOpacity>
            )
          }} />
        </View>

        {/* JADWAL PERAWATANMU*/}
        <View style={{
          padding: 16,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Text style={{
              flex: 1,
              ...fonts.headline4,
              color: Color.blueGray[900]
            }}>Jadwal Perawatanmu</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Treatment', {
              open: 'Jadwal'
            })}>
              <Text style={{
                ...fonts.subheadline3,
                color: Color.blueGray[900]
              }}>Lihat semua</Text>
            </TouchableOpacity>
          </View>
          <FlatList showsHorizontalScrollIndicator={false} horizontal data={dataJawdal} renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback onPress={() => navigation.navigate('JadwalDetail', item)}>
                <View style={{
                  height: 80,
                  width: 288,
                  borderWidth: 1,
                  borderColor: Color.blueGray[400],
                  backgroundColor: index % 2 == 1 ? Color.secondary[900] : Color.primary[900],
                  borderRadius: 12,
                  marginRight: 8,
                  overflow: 'hidden',
                }}>
                  <View style={{
                    backgroundColor: Color.white[900],
                    height: 80,
                    borderRadius: 12,
                    width: 280,
                    left: 8,
                    padding: 12,
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                      <Text style={{
                        ...fonts.headline5,
                        flex: 1,
                        color: Color.blueGray[900],
                      }}>{item.nama_perawatan}</Text>
                      <MyIcon name='calendar-mark' size={24} color={index % 2 == 1 ? Color.secondary[900] : Color.primary[900]} />
                    </View>

                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <MyIcon name='calendar' size={16} color={Color.blueGray[400]} />
                      <Text style={{
                        ...fonts.caption1,
                        marginLeft: 4,
                        color: Color.blueGray[400]
                      }}>{moment(item.tanggal_janji).format('DD MMMM YYYY')}</Text>

                      <View style={{
                        marginHorizontal: 8,
                      }}>
                        <Icon type='ionicon' name='ellipse' size={6} color={Color.blueGray[400]} />
                      </View>
                      <MyIcon name='clock-square' size={16} color={Color.blueGray[400]} />
                      <Text style={{
                        ...fonts.caption1,
                        marginLeft: 4,
                        color: Color.blueGray[400]
                      }}>{moment(moment().format('YYYY-MM-DD ' + item.jam_janji)).format('HH:mm')} - {moment(moment().format('YYYY-MM-DD ' + item.jam_janji)).add(1, 'hours').format('HH:mm')}</Text>

                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          }} />
        </View>

        {/* BLOG dan ARTIKEL*/}
        <View style={{
          padding: 16,
        }}>

          <Text style={{
            flex: 1,
            ...fonts.headline4,
            color: Color.blueGray[900],
            marginBottom: 12,
          }}>Blog dan Artikel</Text>


          <FlatList data={dataArtikel} renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback onPress={() => navigation.navigate('BlogDetail', item)}>
                <View style={{
                  height: 180,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: Color.blueGray[100],
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 16,
                  marginRight: 8,
                  overflow: 'hidden',
                  flexDirection: 'row'
                }}>
                  <View style={{
                    flex: 1,
                  }}>
                    <View style={{
                      flex: 1,
                    }}>
                      <Text style={{
                        ...fonts.headline4,
                        color: Color.blueGray[900],
                        marginBottom: 4,
                      }}>{item.judul}</Text>
                      <Text style={{
                        ...fonts.caption1,
                        color: Color.blueGray.artikelDesc,
                      }}>{item.judul}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('BlogDetail', item)} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 100,
                      borderBottomWidth: 1,
                      borderBottomColor: Color.primary[900]

                    }}>
                      <Text style={{
                        ...fonts.caption1,
                        // flex: 1,
                        color: Color.primary[900],
                        marginRight: 10,
                      }}>Selengkapnya</Text>
                      <MyIcon size={16} color={Color.primary[900]} name='round-arrow-right-up' />
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    // flex: 0.8
                  }}>
                    <Image source={{
                      uri: item.image
                    }} style={{
                      height: 160,
                      width: 120,
                      borderRadius: 8,
                      // resizeMode: 'cover'
                    }} />
                  </View>

                </View>
              </TouchableWithoutFeedback>
            )
          }} />

          <TouchableWithoutFeedback onPress={() => navigation.navigate('Blog')}>
            <View style={{
              height: 42,
              borderWidth: 2,
              borderColor: Color.primary[900],
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  ...fonts.headline5,
                  color: Color.primary[900],
                  marginRight: 10,
                }}>Lihat Semua</Text>
                <MyIcon size={16} name='round-alt-arrow-right' color={Color.primary[900]} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

      </ScrollView>


      <Modal style={{
        margin: 16,
      }} isVisible={isModalVisible2}
        backdropOpacity={0.5}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onRequestClose={() => {

          setModalVisible2(!isModalVisible2);
        }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ImageBackground resizeMode="contain" source={require('../../assets/promo.png')} style={{
            height: windowHeight / 1.5,
            paddingTop: 24,
            paddingHorizontal: 18
          }}>
          </ImageBackground>
          <TouchableOpacity onPress={() => {
            setModalVisible2(false);
            setModalVisible(true);
          }} style={{
            padding: 10,
          }}>
            <Icon type='ionicon' name='close-circle' size={60} color={Color.white[900]} />
          </TouchableOpacity>
        </View>
      </Modal>


      <Modal style={{
        margin: 0,
      }} isVisible={isModalVisible}
        backdropOpacity={0.5}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onRequestClose={() => {

          setModalVisible(!isModalVisible);
        }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{
            height: windowHeight / 1.5,
            backgroundColor: Color.white[900],
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            paddingTop: 24,
            paddingHorizontal: 18
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text style={{
                flex: 1,
                ...fonts.headline4,
                color: Color.blueGray[900],
              }}>Check-in Poin</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon type='ionicon' size={24} name='close-circle' color={Color.blueGray[400]} />
              </TouchableOpacity>

            </View>

            <View style={{
              marginVertical: 20,
              flexDirection: 'row'
            }}>
              <Text style={{
                flex: 1,
                ...fonts.body3,
                color: Color.blueGray[900],
              }}>Reward Poin Saya</Text>

              <View style={{
                height: 36,
                borderRadius: 100,
                paddingHorizontal: 12,
                backgroundColor: Color.secondary[900],
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/poin.png')} style={{
                  width: 28,
                  height: 28,
                }} />
                <Text style={{
                  marginLeft: 5,
                  marginRight: 8,
                  ...fonts.headline5,
                  color: Color.white[900],
                }}>500 poin </Text>
                <MyIcon name='round-alt-arrow-right' size={15} color={Color.white[900]} />
              </View>
            </View>

            <FlatList
              contentContainerStyle={styles.listWrapper}
              style={{
                marginBottom: 20,
                height: 150,
                flexGrow: 0
              }} horizontal data={REWARD} renderItem={({ item, index }) => {
                return (
                  <View style={{

                    width: 45,
                    height: 75,
                    marginRight: 6,
                  }}>
                    <View style={{
                      borderWidth: 1.5,
                      borderColor: index == 0 ? Color.secondary[900] : Color.blueGray[50],
                      height: 75,
                      backgroundColor: Color.blueGray[50],
                      width: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8
                    }}>
                      <Text style={{
                        ...fonts.headline5,
                        color: index == 0 ? Color.secondary[900] : Color.blueGray[900],
                      }}>+{item}</Text>
                      <Image source={require('../../assets/poin.png')} style={{
                        width: 28,
                        height: 28,
                      }} />
                    </View>
                    <Text style={{
                      textAlign: 'center',
                      ...fonts.caption1,
                      color: index == 0 ? Color.secondary[900] : Color.blueGray[400],
                    }}>Hari {index == 0 ? 'ini' : index + 1}</Text>
                  </View>
                )
              }} />
            <Text style={{
              ...fonts.body3,
              color: Color.blueGray[900],
              textAlign: 'center',
            }}>Check-in setiap hari dan dapatkan poin yang dapat kamu tukarkan ke voucher</Text>
            <MyGap jarak={20} />

            <MyButton title="Check-in Poin" onPress={() => {
              setModalVisible(false);
              toast.show('Berhasil check-in harian', {
                type: 'success'
              })
            }} />

            <MyGap jarak={8} />

            <MyButton onPress={() => setModalVisible(false)} backgroundColor={Color.white} borderSize={2} textColor={Color.primary[900]} title="Tutup" />



          </View>
        </View>
      </Modal>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  listWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
})