//SKOOLDIO RANGERS
const request = require('request');

const initSize = 10;
const teamSize = 15;
const minimalToWin = teamSize / 2;

const heroList = [];

const firstNameList = ['John', 'Nate', 'Tony', 'Sarah', 'Christina', 'Jane'];
const lastNameList = ['Wick', 'Stark', 'Rogers', 'Lee'];
const genderList = ['Man', 'Woman', 'Boy', 'Girl', 'Baby', 'King', 'Queen'];
const animalTypeList = ['Cat', 'Ant', 'Spider', 'Elephant', 'Shark', 'Lion', 'Tiger'];

function Hero(human, animal) {
  this.displayName = human.displayName;
  this.gender = human.gender;
  this.animalName = animal.type;
  this.name = this.animalName + this.gender;
}

Hero.prototype.useSkill = function() {
  return this.skill;
};

function randomArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getNewMember() {
  const firstName = randomArray(firstNameList);
  const lastName = randomArray(lastNameList);
  const gender = randomArray(genderList);
  const animalType = randomArray(animalTypeList);
  const human = {
    firstName: firstName,
    lastName: lastName,
    displayName: firstName + ' ' + lastName,
    gender: gender,
  };
  const animal = {
    type: animalType,
  };
  const newHero = new Hero(human, animal);
  return newHero;
}

function initMembers() {
  for (let i = 0; i < initSize; i++) {
    heroList.push(getNewMember());
  }
}

function snap(heroList, isRandomMode, callback) {
  request.post(
    'https://asia-east2-skooldio-courses.cloudfunctions.net/es6/snap',
    {
      json: {
        isRandom: isRandomMode,
        heroList: heroList,
      },
    },
    function(error, response, body) {
      heroList = body.heroLeft;
      console.log(`After The Snap, we have
${heroList.map(hero => hero.name)} left.`);
      callback(heroList, afterFightCallback);
    }
  );
}

function fightBack(heroList, afterFightCallback) {
  const recruitCount = teamSize - heroList.length;
  console.log(`To Fight Back we have to get ${recruitCount} more members`);
  console.log(`
...Start recruiting new members...`);

  for (let i = 0; i < recruitCount; i++) {
    const hero = getNewMember();
    console.log(`OK, we have ${hero.name} AKA ${hero.displayName} now.`);
    heroList.push(hero);
  }
  let winCount = 0;
  let fightCount = 0;
  console.log(`Now we have ${heroList.length} members`);
  console.log(`Ready to Fight Back....
go
go
go`);
  for (let i = 0; i < heroList.length; i++) {
    const hero = heroList[i];
    request('https://asia-east2-skooldio-courses.cloudfunctions.net/es6/fight', function(
      error,
      response,
      body
    ) {
      const result = JSON.parse(body);
      const fightResult = result.isWinTheFight;
      console.log(`${hero.name} ${fightResult ? 'won' : 'lost'} the fight.`);
      fightCount++;
      if (fightResult) winCount++;
      if (fightCount == teamSize) afterFightCallback(winCount);
    });
  }
}

function afterFightCallback(winCount) {
  if (winCount > minimalToWin) {
    console.log(`
Your team has won`);
  } else {
    console.log(`
Your team has lost`);
  }
}

initMembers();
console.log(`   'The Skooldio Rangers'
Episode 0: Let's Fight Back, Skooldio Rangers!!!`);
console.log(`
Before The Snap, we have
${heroList.map(hero => hero.name)}`);
snap(heroList, true, fightBack);
