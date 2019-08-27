const fetch = require('node-fetch');

const herolist = ['test', 'nun', 'tong', 'ta'];
const teamSize = 10;
const minimalToWin = teamSize / 2;
const snap = async (herolist, isRandomMode) => {
  // async await call api
  return fetch('https://asia-east2-skooldio-courses.cloudfunctions.net/es6/snap', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      isRandom: isRandomMode,
      heroList: herolist,
    }),
  })
    .then(res => {
      return res.json();
    })
    .catch(error => console.error(error));
};

const getNewMember = (human, animal) => {
  //spread rest
  return 'member';
  // const {name: realname, job, gender } = human;
  // const {skill, name: animalName} = animal
  // const heroName = gender === "male" animalName+" Man":animalName + " Women"
  // const hero = {
  //     heroName,
  //     skill,
  //     realname,
  //     job
  // }
  // herolist.push(hero)
};

const afterFight = winCount => {
  if (winCount > minimalToWin) {
    console.log(`
You Team Win`);
  } else {
    console.log(`
You Team Lose`);
  }
};

const fightBack = async herolist => {
  const recruitCount = teamSize - herolist.length;
  console.log(`
To Fight Back we have to get more ${recruitCount} members
...Start recruit new members...
  `);

  for (let i = 0; i < recruitCount; i++) {
    const hero = getNewMember();
    console.log(`OK, We have ${hero} now.`);
    herolist.push(getNewMember());
  }
  let winCount = 0;
  let fightCount = 0;
  console.log(`
Now we have ${herolist.length} members`);
  console.log(`
Ready to Fight Back....
go
go
go`);
  const result = await Promise.all(
    herolist.map(async hero => {
      const { isWinTheFight: fightResult } = await fetch(
        'https://asia-east2-skooldio-courses.cloudfunctions.net/es6/fight'
      ).then(res => res.json());
      console.log(`${hero} ${fightResult ? 'win' : 'lose'} the fight.`);
      return fightResult;
    })
  );
  return result.filter(res => res).length;
};
console.log(`    'The Skooldio Rangers'
Episode 0: Let Fight Back Skooldio Rangers!!!

Before The Snap, we have
${herolist}
`);

const begin = async () => {
  const { heroLeft = [] } = await snap(herolist, true);
  const winCount = await fightBack(heroLeft);
  afterFight(winCount);
};

begin();
