const schedules = {
    '110': require('./110.json'),
    '111': require('./111.json'),
    '112': require('./112.json'),
    '115': require('./115.json'),
    '116': require('./116.json'),
    '118': require('./118.json'),
    '130': require('./130.json'),
    '131': require('./131.json'),
    '132': require('./132.json'),
    '135': require('./135.json'),
    '151': require('./151.json'),
    '161': require('./161.json'),
    '162': require('./162.json'),
    '136': require('./136.json'),
    '210': require('./210.json'),
    '211': require('./211.json'),
    '212': require('./212.json'),
    '213': require('./213.json'),
    '215': require('./215.json'),
    '216': require('./216.json'),
    '231': require('./231.json'),
    '233': require('./233.json'),
    '232': require('./232.json'),
    '235': require('./235.json'),
    '236': require('./236.json'),
    '237': require('./237.json'),
    '251': require('./251.json'),
    '261': require('./261.json'),
    '310': require('./310.json'),
    '311': require('./311.json'),
    '312': require('./312.json'),
    '313': require('./313.json'),
    '315': require('./315.json'),
    '316': require('./316.json'),
    '317': require('./317.json'),
    '331': require('./331.json'),
    '333': require('./333.json'),
    '334': require('./334.json'),
    '332': require('./332.json'),
    '335': require('./335.json'),
    '336': require('./336.json'),
    '337': require('./337.json'),
    '338': require('./338.json'),
    '351': require('./351.json'),
    '361': require('./361.json'),
    '362': require('./362.json'),
    '411': require('./411.json'),
    '413': require('./413.json'),
    '414': require('./414.json'),
    '415': require('./415.json'),
    '416': require('./416.json'),
    '431': require('./431.json'),
    '433': require('./433.json'),
    '434': require('./434.json'),
    '432': require('./432.json'),
    '435': require('./435.json'),
    '436': require('./436.json'),
    '437': require('./437.json'),
    '451': require('./451.json'),
    '461': require('./461.json'),
    '511': require('./511.json'),
    '515': require('./515.json'),
    '531': require('./531.json'),
    '532': require('./532.json'),
    '535': require('./535.json'),
    '536': require('./536.json'),
    '551': require('./551.json'),
    '561': require('./561.json')
  };
  
  const scheduleTimes = [
    { period: "1 пара", start: "08:00", end: "09:35" },
    { period: "2 пара", start: "09:50", end: "11:25" },
    { period: "3 пара", start: "11:40", end: "13:15" },
    { period: "4 пара", start: "13:30", end: "15:05" },
    { period: "5 пара", start: "15:20", end: "16:55" },
    { period: "6 пара", start: "17:10", end: "18:45" },
    { period: "7 пара", start: "19:00", end: "20:35" },
  ];
  
  const courses = {
    '1 курс': ['110', '111', '112', '115', '116', '118', '130', '131', '132', '135', '136', '151', '161', '162'],
    '2 курс': ['210', '211', '212', '213', '215', '216', '231', '233', '232', '235', '236', '237', '251', '261'],
    '3 курс': ['310', '311', '312', '313', '315', '316', '317', '331', '333', '334', '332', '335', '336', '337', '338', '351', '361', '362'],
    '4 курс': ['411', '413', '414', '415', '416', '431', '433', '434', '432', '435', '436', '437', '451', '461'],
    '5 курс': ['511', '515', '531', '532', '535', '536', '551', '561']
  };
  
  export { schedules, scheduleTimes, courses };
  