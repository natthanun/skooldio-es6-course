//SKOOLDIO RANGERS
const request = require('request');
const fetch = require('node-fetch');

const initSize = 10;
const teamSize = 15;
const minimalToWin = teamSize / 2;

const heroList = [];

const firstNameList = ['John', 'Nate', 'Tony', 'Sarah', 'Christina', 'Jane'];
const lastNameList = ['Wick', 'Stark', 'Rogers', 'Lee'];
const genderList = ['Man', 'Woman', 'Boy', 'Girl', 'Baby', 'King', 'Queen'];
const animalTypeList = ['Cat', 'Ant', 'Spider', 'Elephant', 'Shark', 'Lion', 'Tiger'];

class Hero {
  constructor(human, animal) {
    const { displayName, gender } = human;
    const { type } = animal;

    this.displayName = displayName;
    this.gender = gender;
    this.animalName = type;
    this.name = this.animalName + this.gender;
    this.skill = 'yah~!';
  }

  useSkill() {
    return this.skill;
  }
}

const randomArray = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getNewMember = () => {
  const firstName = randomArray(firstNameList);
  const lastName = randomArray(lastNameList);
  const gender = randomArray(genderList);
  const animalType = randomArray(animalTypeList);
  const human = {
    firstName,
    lastName,
    displayName: firstName + ' ' + lastName,
    gender,
  };
  const animal = {
    type: animalType,
  };
  const newHero = new Hero(human, animal);
  return newHero;
};

const initMembers = () => {
  for (let i = 0; i < initSize; i++) {
    heroList.push(getNewMember());
  }
};

const snap = async (heroList, isRandomMode) => {
  return fetch('https://asia-east2-skooldio-courses.cloudfunctions.net/es6/snap', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      isRandom: isRandomMode,
      heroList: heroList,
    }),
  }).then(response => response.json());
};

const fightBack = async (heroList, afterFightCallback) => {
  const recruitCount = teamSize - heroList.length;
  console.log(`
To Fight Back we have to get ${recruitCount} more members

...Start recruiting new members...`);

  for (let i = 0; i < recruitCount; i++) {
    const hero = getNewMember();
    console.log(`OK, we have ${hero.name} AKA ${hero.displayName} now.`);
    heroList.push(hero);
  }
  console.log(`
Now we have ${heroList.length} members

Ready to Fight Back....
go
go
go`);

  const [leader, ...restMembers] = heroList;

  console.log(`${leader.name} is the leader of the team`);
  return Promise.all(
    restMembers.map(async hero => {
      const { isWinTheFight } = await fetch(
        'https://asia-east2-skooldio-courses.cloudfunctions.net/es6/fight'
      ).then(response => response.json());
      console.log(hero.useSkill());
      console.log(`${hero.name} ${isWinTheFight ? 'won' : 'lost'} the fight.`);
      return isWinTheFight;
    })
  );
};

const afterFight = winCount => {
  if (winCount > minimalToWin) {
    console.log(`
Your team has won`);
  } else {
    console.log(`
Your team has lost`);
  }
};

initMembers();
console.log(`   'The Skooldio Rangers'
Episode 0: Let's Fight Back, Skooldio Rangers!!!

Before The Snap, we have
${heroList.map(hero => hero.name)}`);
const beginFight = async () => {
  const { heroLeft } = await snap(heroList, true);
  const newHeroList = await heroList.filter(async hero =>
    heroLeft.includes(i => i.name == hero.name)
  );
  console.log(`
After The Snap, we have
${newHeroList.map(hero => hero.name)} left.`);

  const fightResult = await fightBack(newHeroList);
  const countFightResult = fightResult.filter(isWon => isWon).length;
  afterFight(countFightResult + 1);
};

beginFight();
