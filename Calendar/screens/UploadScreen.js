import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const { height } = Dimensions.get('window');

const courses = {
  '1 курс': {
    '110 ,111 ,112': 'https://drive.google.com/file/d/1NygtjT3MhXnb_Hf234y5oRle_bIvi9pU/view',
    '115,116': 'https://drive.google.com/file/d/12nA5UV5WUnJLwb-HF3CR1c7WfTSNBNao/view',
    '118': 'https://drive.google.com/file/d/1CLpXLMua5d7cNjfTlZGwLPxT3mrVC5zG/view',
    '130,131': 'https://drive.google.com/file/d/1Mfz78MU9s6wruqbRpz9i5RvWtDuoV6x7/view',
    '132': 'https://drive.google.com/file/d/1cEM9N5AElGUmJoU-15BJ24OVTHef6zV9/view',
    '135': 'https://drive.google.com/file/d/1HsHAqeIl-uW4949zicxj3UwYrV_IzNSn/view',
    '136': 'https://drive.google.com/file/d/18wSQGquaVFANXUIUz0K6FZrXMVllzYGN/view',
    '151': 'https://docs.google.com/spreadsheets/d/1L8EYGfnhAXcpljCwPG628Kz49IUl8HlV/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '161,162': 'https://docs.google.com/spreadsheets/d/1vv_qWIfxEjXfy9hcyeat8l8U0OUS4Hkl/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
  },
  '2 курс': {
    '210,211,212,213': 'https://drive.google.com/file/d/1CuP5PWvjkGNeAPdfDkxrQZ_ge2bHWH96/view',
    '215,216': 'https://drive.google.com/file/d/1e-N9x5JxoiM4tcvFalcgAADuocsSq0kU/view',
    '231,233': 'https://drive.google.com/file/d/1bJO6nWpJPtNVYoACPoCrsgyFT_1R8SbU/view',
    '232': 'https://drive.google.com/file/d/1gpq3X677-iieZ2n3IQ6-t2MlOAuWCdZm/view',
    '235,236,237': 'https://drive.google.com/file/d/1IIhpiM-3PKmNV3d0FHcrlTEkiKuqF2uY/view',
    '251': 'https://docs.google.com/spreadsheets/d/1r4qIP-iaFMDM-09OSkGr7JhaSXHFeTqz/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '261': 'https://drive.google.com/file/d/1smrHVixVBZEels6Jgvjac_-GlQnKS7sE/view?usp=sharing',
  },
  '3 курс': {
    '310,311,312,313': 'https://drive.google.com/file/d/1YAoG5VhRaxJD7GxaBlG8QMZY5v_8QVz1/view',
    '315,316,317': 'https://docs.google.com/spreadsheets/d/1pGXKGo52KYgV2m-m7db838E6ybpE3cOm/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '331,333,334': 'https://docs.google.com/spreadsheets/d/1AU7T35CcZjCbI_6tuS0YmzqmSOYhunfe/edit?usp=sharing&rtpof=true&sd=true',
    '332': 'https://docs.google.com/spreadsheets/d/16chpi_-you6c6t_PallQs7JvPxNNnp6s/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '335,336,337,338': 'https://docs.google.com/spreadsheets/d/1chLLGGqMokyhQEecvDiLyFjn011Xeb1N/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '351': 'https://docs.google.com/spreadsheets/d/12sejtUDvdQmVXXwFBUW26Dw84yLbugUC/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '361,361': 'https://docs.google.com/spreadsheets/d/19uVuc4AZmebOfrswticuObG7MtaYgBq4/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
  },
  '4 курс': {
    '411,413,414': 'https://docs.google.com/spreadsheets/d/1vdXKbO6Gv25d5oW3xTCS3pSCaRTJnmwq/edit?usp=sharing&rtpof=true&sd=true',
    '415,415': 'https://docs.google.com/spreadsheets/d/11Lhl4me78tT8IP8jwOHF3NB7p1n22hk9/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '431,433,434': 'https://docs.google.com/spreadsheets/d/1zsf2EJDOZZO31y2fDIdaF4SIQnGg_aU-/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '432': 'https://docs.google.com/spreadsheets/d/147Wx0s23_WLTffaubOeN5zzR5V2rDD_u/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '435,436,437': 'https://docs.google.com/spreadsheets/d/1tuZaB-UYFDgNLaqWeAR0BLC4Xim8c3kZ/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '451': 'https://drive.google.com/file/d/1fHOOU_onF0FGNGHLwSDcJlcOW4EjtQwy/view',
    '461': 'https://docs.google.com/spreadsheets/d/1TPLB77WK_BDVY2J6SFNBTvDMhzH6am_b/edit#gid=1238846972',
  },
  '5 курс': {
    '511': 'https://drive.google.com/file/d/1GKMugF7BVfCXqCfSyqQ4BeC9DFhZorxm/view',
    '515': 'https://docs.google.com/spreadsheets/d/1HbXiKY7qNOIpUtRAu7CKGT_X_LiGj8t6/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '531': 'https://drive.google.com/file/d/1vbTQsBPI9Rvlg-SIW9Yj0a7KVY3TtNOa/view',
    '532': 'https://docs.google.com/spreadsheets/d/1lDsV03yk8KKVIYWUSMikW_AGD3bXQClI/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '535,536': 'https://drive.google.com/file/d/1NE2cwZTvkln1OWF0MJRCcNlLrSFUbTaU/view',
    '551': 'https://docs.google.com/spreadsheets/d/1TOzn8nyvFwi0lHwxnMbTehgwiZgwQ8_g/edit?usp=sharing&ouid=110982410831226660809&rtpof=true&sd=true',
    '561': 'https://drive.google.com/file/d/1-fqRlFBjLe2wmz_4-a2vnZuZ_KAHtftD/view',
  }
};

const ScheduleApp = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const navigation = useNavigation();

  const renderCourseButtons = () => {
    return Object.keys(courses).map((course) => (
      <TouchableOpacity key={course} style={styles.button} onPress={() => handleCourseChange(course)}>
        <Text style={styles.buttonText}>{course}</Text>
      </TouchableOpacity>
    ));
  };

  const renderSpecialtyButtons = () => {
    if (!selectedCourse) return null;
    return Object.keys(courses[selectedCourse]).map((specialty) => (
      <TouchableOpacity key={specialty} style={styles.button} onPress={() => handleSpecialtyChange(specialty)}>
        <Text style={styles.buttonText}>{specialty}</Text>
      </TouchableOpacity>
    ));
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setSelectedSpecialty(''); // Clear the specialty selection
  };

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
    const selectedLink = courses[selectedCourse][specialty];
    const injectedJavaScript = `
      var meta = document.createElement('meta'); 
      meta.name = 'viewport'; 
      meta.content = 'width=device-width, initial-scale=0.47, maximum-scale=0.7, user-scalable=yes'; 
      document.getElementsByTagName('head')[0].appendChild(meta);
    `;
    navigation.navigate('Schedule', { selectedLink, injectedJavaScript });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Виберіть курс:</Text>
          <View style={styles.buttonContainer}>
            {renderCourseButtons()}
          </View>
          {selectedCourse ? (
            <>
              <Text style={styles.title}>Виберіть групу:</Text>
              <View style={styles.buttonContainer}>
                {renderSpecialtyButtons()}
              </View>
            </>
          ) : null}
        </View>
      </SafeAreaView>
      <Header style={styles.header} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1F7F9",
  },
  safeArea: {
    flex: 1,
    marginTop: "5%",
    paddingBottom: 60, // space for the header
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  title: {
    fontSize: 23,
    textAlign: 'center',
    marginBottom: 10,
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10, // Ensure header is above other content
  },
});

export default ScheduleApp;
