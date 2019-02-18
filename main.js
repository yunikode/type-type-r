window.addEventListener('load', init);

let difficulty = 5;
let score = 0;
let isPlaying;
let stringIndex = 0;
let filthMode = false;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const showTimer = document.querySelector('#time_display--running');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

let words = '';

function init() {
  console.log("Try '50shades' for a NSFW version!");
  newParagraph();
  showWord(words);
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
}

function showWord(words) {
  currentWord.innerHTML = words[stringIndex];
}

function newParagraph() {
  if (filthMode) {
    words = generate(5).split(' ');
  } else {
    words = saneSentence().split(' ');
  }
  stringIndex = 0;
}

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = difficulty + 1;

    stringIndex++;
    stringIndex === words.length ? newParagraph() : '';
    showWord(words);
    wordInput.value = '';
    score++;
  }
  score === -1
    ? (scoreDisplay.innerHTML = 0)
    : (scoreDisplay.innerHTML = score);
  // scoreDisplay.innerHTML = score
}

function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct';
    return true;
  } else if (wordInput.value === '50shades') {
    filthMode = !filthMode;
    newParagraph();
    return true;
  } else {
    message.innerHTML = 'False!';
    return false;
  }
}

function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!';
    score = -1;
    stringIndex = -1;
    showTimer.classList.add('hide');
  }
  if (filthMode) {
    document.getElementsByTagName('body')[0].classList.add('bg-warning');
  }
  if (isPlaying) {
    showTimer.classList.remove('hide');
  }
}

function parse_sentence(sentence) {
  var output = '';
  var open_pos, close_pos, token, parts, items;

  while (sentence.length > 0) {
    open_pos = sentence.indexOf('[');

    if (open_pos > -1) {
      output = output + sentence.substr(0, open_pos);

      sentence = sentence.substr(open_pos + 1);

      close_pos = sentence.indexOf(']');
      token = sentence.substr(0, close_pos);

      parts = token.split('-');
      switch (parts[0]) {
        case 'verb':
          items = vocab.verbs[parts[1]];

          switch (parts[2]) {
            case 'root':
              output =
                output + items[Math.floor(Math.random() * items.length)][0];
              break;
            case 'past':
              output =
                output + items[Math.floor(Math.random() * items.length)][1];
              break;
            case 'present':
              output =
                output + items[Math.floor(Math.random() * items.length)][2];
              break;
          }

          break;
        case 'noun':
          items = vocab.nouns[parts[1]];
          output = output + items[Math.floor(Math.random() * items.length)];
          break;
        case 'simile':
          items = vocab.similes[parts[1]];
          output = output + items[Math.floor(Math.random() * items.length)];
          break;
      }

      sentence = sentence.substr(close_pos + 1);
    } else {
      output = output + sentence;
      sentence = '';
    }
  }

  return output;
}

// Randomly grabs the specified number of sentences and parses them.
function generate(number_of_sentences) {
  var output = '';

  sentences.sort(function() {
    return 0.5 - Math.random();
  });
  var working_set = sentences.slice(0, number_of_sentences);

  for (var i = 0; i < number_of_sentences; i++) {
    output = output + parse_sentence(working_set[i]) + ' ';
  }

  return output.substr(0, output.length - 1);
}

function saneSentence() {
  var output = '';

  output += who[Math.floor(Math.random() * who.length)];

  output += ` ${where[Math.floor(Math.random() * where.length)]}`;

  output += ` ${what[Math.floor(Math.random() * what.length)]}`;

  output += ` ${why[Math.floor(Math.random() * why.length)]}`;

  return output;
}

// Replaces the text in the document.
const sentences = [
  'The unrelenting orgasms from his [noun-penis] [verb-sex-present] my [noun-vagina] made me come so hard, I began sweating like [simile-sweat].',
  'After having my [noun-vagina] [verb-sex-past], he then proceeded to [verb-sex-root] my [noun-anus].',
  'The [verb-sex-present] makes me [verb-squirt-root] my [noun-lady_cum] all over his [noun-penis].',
  'By now, my [noun-vagina] was [verb-dribble-present] like [simile-dribble].',
  "I can't wait to [verb-suck-root] the [noun-semen] from his [noun-penis].",
  'My [noun-vagina] was trembling like [simile-shake].',
  'Inserting [noun-insertable] into my [noun-vagina] got me [verb-squirt-present] [noun-lady_cum] faster than [simile-fast].',
  'The [verb-sex-present] of my [noun-anus] was so vigorous, he soon found his [noun-testes] joining his [noun-penis] deep in my [noun-anus].',
  "He munched on my [noun-labia], even though I'd [noun-menstruation] for the best part of a week.",
  'He [verb-defecate-past] a giant [noun-faeces] on my [noun-breasts] just so he could [verb-suck-root] it up like [simile-eat].',
  'With his [noun-penis] [verb-sex-present] deep into my [noun-vagina], the sensation of his [noun-penis] smashing my cervix made me [verb-shake-root] like [simile-shake].',
  "When he removed his [noun-penis] from my [noun-anus], he was pleasantly surprised to see a [noun-faeces] staring back as him. He knew I couldn't wait to [verb-suck-root] the [noun-faeces] off his [noun-penis].",
  'Within no time, I could feel the shitty [noun-semen] [verb-dribble-present] from my [noun-anus] and all over my [noun-labia].',
  "Hours of [verb-sex-present] like this would leave any girl's [noun-labia] looking like [simile-sore], and I was no different!",
  'The mixture of [noun-faeces] and [noun-semen] in my [noun-anus] created the delicious [noun-seepage] that he was so fond of.',
  "Now, I've [simile-promiscuous], but the sight of his [noun-penis] made my [noun-lady_cum] [verb-dribble-root] like [simile-dribble].",
  "The seemingly never-ending streams of [noun-semen] emanating from his [noun-penis] soon had me coated like a plasterer's radio.",
  'I awoke the next morning with my [noun-vagina] still [verb-dribble-present]. I thought it was over but his [noun-penis] had other ideas.',
  'With my [noun-labia] now much like [simile-sore], he thought it was time to start [verb-insert-present] my [noun-anus]. Is now the time to tell him I really need to [verb-defecate-root] a [noun-faeces], I wondered?',
  'The feeling of his [noun-semen] [verb-dribble-present] down my throat got my [noun-lady_cum] flowing quicker than [simile-fast].',
  "It was bliss having his [noun-penis] [verb-insert-past] inside me again; stuffing my [noun-vagina] with [noun-insertable] just didn't get my [noun-vagina] [verb-squirt-present] like it used to.",
  'There was [noun-semen] [verb-dribble-present] from his [noun-penis] and I was wetter than [simile-wet]. We were ready for more.',
  'My [noun-mouth] was so full of [noun-penis] and [noun-semen], the [noun-semen] was [verb-dribble-present] down my chin and onto my [noun-breasts].',
  'Leaving my panties sunny side up on the floor was the least of my worries as his [noun-penis] [verb-insert-past] deeper into my [noun-anus].',
  "Some girls are happy just to [noun-masturbate] when they're alone, but I can't get off without having [noun-insertable] in my [noun-vagina] and [noun-insertable] up my [noun-anus].",
  "If I don't [noun-masturbate] to get my [noun-lady_cum] [verb-dribble-present] from my [noun-vagina], his [noun-penis] is going to leave my [noun-labia] resembling [simile-sore]."
];

const vocab = {
  verbs: {
    sex: [
      ['fuck', 'fucked', 'fucking'],
      ['hammer', 'hammered', 'hammering'],
      ['plow', 'plowed', 'plowing'],
      ['pound', 'pounded', 'pounding'],
      ['raid', 'raided', 'raiding'],
      ['slam', 'slammed', 'slamming'],
      ['thrust', 'thrusted', 'thrusting']
    ],
    insert: [
      ['plunge', 'plunged', 'plunging'],
      ['probe', 'probed', 'probing'],
      ['ram', 'rammed', 'ramming'],
      ['shove', 'shoved', 'shoving'],
      ['slide', 'slid', 'sliding'],
      ['stuff', 'stuffed', 'stuffing']
    ],
    squirt: [
      ['eject', 'ejected', 'ejecting'],
      ['flood', 'flooded', 'flooding'],
      ['flow', 'flowed', 'flowing'],
      ['gush', 'gushed', 'gushing'],
      ['pour', 'poured', 'pouring'],
      ['spit', 'spattered', 'spattering'],
      ['splurge', 'splurged', 'splurging'],
      ['spout', 'spouted', 'spouting'],
      ['spray', 'sprayed', 'spraying'],
      ['spritz', 'spritzed', 'spritzing'],
      ['squirt', 'squirted', 'squirting'],
      ['surge', 'surged', 'surging']
    ],
    dribble: [
      ['drain', 'drained', 'draining'],
      ['dribble', 'dribbled', 'dribbling'],
      ['drip', 'dripped', 'dripping'],
      ['flow', 'flowed', 'flowing'],
      ['foam', 'foamed', 'foaming'],
      ['froth', 'frothed', 'frothing'],
      ['haemorrhage', 'haemorrhaged', 'haemorrhaging'],
      ['leach', 'leached', 'leaching'],
      ['leak', 'leaked', 'leaking'],
      ['ooze', 'oozed', 'oozing'],
      ['seep', 'seeped', 'seeping'],
      ['slime', 'slimed', 'sliming'],
      ['slobber', 'slobbered', 'slobbering'],
      ['trickle', 'trickled', 'trickling'],
      ['weep', 'wept', 'weeping']
    ],
    suck: [
      ['chow down on', 'chowed down on', 'chowing down on'],
      ['consume', 'consumed', 'consuming'],
      ['devour', 'devoured', 'devouring'],
      ['gobble', 'gobbled', 'gobbling'],
      ['lap', 'lapped', 'lapping'],
      ['suck', 'sucked', 'sucking']
    ],
    defecate: [
      ['arc', 'arced', 'arcing'],
      ['blast', 'blasted', 'blasting'],
      ['cop', 'copped', 'copping'],
      ['crown', 'crowned', 'crowning'],
      ['curl', 'curled', 'curling'],
      ['cut', 'cut', 'cutting'],
      ['drop', 'dropped', 'dropping'],
      ['ease', 'eased out', 'easing out'],
      ['extrude', 'extruded', 'extruding'],
      ['launch', 'launched', 'launching'],
      ['pinch off', 'pinched off', 'pinching off'],
      ['pitch', 'pitched', 'pitching'],
      ['roll', 'rolled', 'rolling']
    ],
    shake: [['quake', 'quaked', 'quaking'], ['quiver', 'quivered', 'quivering']]
  },
  nouns: {
    anus: [
      'balloon knot',
      'black hole',
      'brown eye',
      'brown mile',
      'cocoa channel',
      'chocolate starfish',
      'fart valve',
      'fudge factory',
      'marmite motorway',
      'Mavis Fritter',
      'mud flap',
      'old dirt road',
      'other vagina',
      'Oxo orifice',
      'poop chute',
      'poo pipe',
      'puckered brown eye',
      'ring piece',
      'rusty bullet hole',
      "rusty sherif's badge",
      'soft tight anus',
      'shit winker',
      "tradesman's entrance",
      'turd cutter',
      'turd-herder',
      'vintage golf bag'
    ],
    breasts: [
      'boobage',
      'breasticles',
      'cans',
      'chesticles',
      'chest puppies',
      'droopies',
      'fiery biscuits',
      'love bubbles',
      'mammaries',
      'mosquito bites',
      'rack',
      'superdroopers',
      'sweater puppies',
      'tatas',
      'top bollocks',
      'twin peaks'
    ],
    faeces: [
      'butt nugget',
      'colon cobra',
      'corn-eyed butt snake',
      'footlong fudge bullet',
      'hardened fudge nugget',
      'Mr. Hanky',
      'sewer trout',
      'stink pickle',
      'toilet twinkie'
    ],
    insertable: [
      'a 15" spiked vibrator',
      'a 10 inch purple battery-operated monster',
      'a 9-iron',
      'a barbie doll',
      'a gerbil',
      'a lightbulb',
      'a number of chillies',
      'a squash',
      'an egg timer',
      'an antique doorknob',
      'my fist'
    ],
    labia: [
      'beef curtains',
      'clap flaps',
      'fishy flaps',
      'flappy meal',
      'furburger',
      'hairy goblet',
      'lunchmeat',
      'meaty hangers',
      'open-faced ham sandwich',
      'panty hamster',
      'piss flaps',
      'purple cabbage',
      'roast beef platter',
      'spam castanets',
      'velcro triangle',
      'vertical garden',
      'vertical smile'
    ],
    lady_cum: [
      'beige slime',
      'clunge gunge',
      'fallopian fish stock',
      'flange custard',
      'minge monsoon',
      'minge mucus',
      'pussy batter',
      'sex wee',
      'shrimp sap',
      'spaff',
      'tuna tunnel tears',
      'vertical moisture'
    ],
    masturbate: [
      'audition the finger puppets',
      'buff the muff',
      'dial the rotary phone',
      'finger blast',
      'fish for pearls',
      'flick the bean',
      'fluff the muff',
      'get a stinky pinky',
      'play the clitar',
      'study english cliterature',
      'strum the banjo',
      'stimulate the genitals through phalangetic motion',
      'tune the tuna'
    ],
    menstruation: [
      'been on the rag',
      'been riding the cotton pony',
      'been surfing the crimson tide',
      'been up on bricks',
      'been walking the red carpet',
      'had Aunt Flo visiting',
      'had my redwings',
      'had the painters in'
    ],
    mouth: ['cake hole', 'laryngina', 'mouth', 'throat'],
    penis: [
      'all-beef thermometer',
      'ample cock',
      'bald avenger',
      'balony pony',
      'bald-headed yogurt slinger',
      'batter blaster',
      'battering ram',
      'blind butler',
      'blood-engorged mayonnaise cannon',
      'blue-veined custard chucker',
      'brie baton',
      'bugger king',
      'clunger',
      'cunt stretcher',
      'cervix cigar',
      'cumtree',
      'chorizo howitzer',
      'chubstep',
      'cream reaper',
      'cunt plunger',
      'cheese-crusted cock',
      'disco stick',
      "devil's bagpipe",
      'eight inches of throbbing pink jesus',
      'flesh gordon',
      'greasy kebab skewer',
      'greasy slimelight',
      'gristle missile',
      'giggle stick',
      'huge penis',
      'jebend',
      'kebeb skewer',
      'long-dong silver',
      'love lollipop',
      'love muscle',
      'master of ceremonies',
      'meaty member',
      'muffbuster',
      'mutton dagger',
      "Nelson's Column",
      "Ocean's 11 Inches",
      'one-eyed milkman',
      'one-eyed monster',
      'pink tractor beam',
      'piss pipe',
      'purple beaver buster',
      'purple-headed trouser snake',
      'ramrod',
      'skeleton king',
      'skin flute',
      'slut slayer',
      'spam dagger',
      'spam javelin',
      'stilton sword',
      'sperminator',
      'spunk-filled spam rocket',
      'stilton spear',
      'tallywacker',
      'tenderloin truncheon',
      'thrill drill',
      'throbbing quim dagger',
      'timed slimer',
      'turgid terror truncheon',
      'vein cane',
      'veiny quim prod',
      'womb raider',
      'womb ferret',
      'washington monument',
      'wensleydale wand',
      'wrist-thick wand'
    ],
    seepage: [
      'porthole pudding',
      'rectal stew',
      'rectoplasm',
      'sphincter sauce'
    ],
    semen: [
      'baby gravy',
      'cock custard',
      'cock snot',
      'creamy load',
      'Da Vinci load',
      'ectoplasm',
      "gentleman's relish",
      'love mayonnaise',
      'love piss',
      "magician's wax",
      'man fat',
      'penis pudding',
      "steamin' semen"
    ],
    testes: [
      'chin pounders',
      'clock weights',
      'family jewels',
      'hairy walnuts',
      'jingle-jangle jewellery',
      'kids on a swing',
      'love spuds',
      'man berries',
      'man marbles',
      'salty protein grapes',
      'scroto baggins',
      'sperm factories',
      'trouser conkors',
      'two amigos',
      'wrecking balls'
    ],
    vagina: [
      'bearded haddock pasty',
      'birth cannon',
      'calamari cockring',
      'carp cavity',
      'chamber of squelch',
      'chlamydia canal',
      'clam-flavoured pothole',
      'clearing in the woods',
      'clunge pool',
      'cock holster',
      'cod canyon',
      'cod cave',
      'cod crater',
      'cum dumpster',
      'depravity cavity',
      'enchilada of love',
      'frilling pink golf bag',
      'front bum',
      'fuck gutter',
      'fuck trench',
      'furry cup',
      'gammon alley',
      'gaping clam cavern',
      'gashtray',
      'ground zero grotto',
      'hatchet wound',
      'herring hole',
      'hot pocket',
      'kipper dinghy',
      'ladytown',
      'meat purse',
      'moose knuckle',
      'mound of love pudding',
      'municipal cockwash',
      'one slice toaster',
      'oyster ditch',
      'penis pothole',
      'pink velvet sausage wallet',
      'quim',
      'Quimcy, M.E.',
      'salmon slit',
      'slime hole',
      'soft-shelled tuna taco',
      'shamevelope',
      'shame portal',
      'smush mitten',
      'south mouth',
      'sperm socket',
      'split peach',
      'spunk dungeon',
      'stench trench',
      'tampon tunnel',
      'tuna canal',
      'vaginal bacon buffet',
      'vibration station',
      'vibrator crater',
      'whispering eye',
      'wizards sleeve',
      'wunder down under'
    ]
  },
  similes: {
    dribble: [
      'a broken coffee maker',
      'a broken fridge freezer',
      'a George Foreman grill',
      'a hungry pig at a trough',
      'a jizz waterfall',
      'a leaky tap',
      'a rabid dog',
      'a slavering dog',
      'a slug in a salt mine',
      'Adele waiting for Greggs to open',
      "Augustus Gloop's mouth at the sight of Willy Wonka's chocolate river",
      'someone had poured fairy liquid into Niagara Falls',
      'there was a midget inside me with a super soaker',
      "Wayne Rooney's dick in an OAP home"
    ],
    dry: ["a nun's cunt", "Ghandi's flip flops"],
    eat: [
      'a bulldog eating porridge',
      'a hungry hungry hippo',
      'a pig at a trough'
    ],
    fast: [
      'a greased weasel shit',
      'greased shit off a shiny shovel',
      'snot off a whip'
    ],
    promiscuous: [
      'been shot over more times than Sarajevo',
      'been told the sperm bank will accept my spit',
      'had more hands up me than The Muppets',
      'seen more action than Helmand Province',
      'seen more foreskins than a rabbi during a baby boom',
      'seen more helmets than Hitler',
      'seen more japseyes than an oriental optician',
      'seen more pricks than a second hand dartboard',
      'taken more poundings than the Somme'
    ],
    shake: [
      'a rat on acid',
      'a shitting dog',
      'a tasered slab of chopped liver',
      'an epileptic at a Pink Floyd concert',
      'jelly',
      'Micheal J. Fox licking a car battery',
      'Muhammad Ali on a tumble dryer',
      "Vanessa Feltz's diesel-powered vibrator"
    ],
    sore: [
      'a badly wrapped kebab',
      "a blind cobbler's thumb",
      'a bulldog licking piss from a thistle',
      'a bulldog in a windtunnel',
      'a bucket of smashed crabs',
      "a clown's pocket",
      "a darts team's goalkeeper",
      'a dropped burrito',
      'a gutted trout',
      "a hippo's yawn",
      "a horse's collar",
      'a manatee in yoga pants',
      'a motorway pileup',
      "a rabid baboon's arse",
      'a ripped out fireplace',
      'a sand blasted tomato',
      'a shot cat',
      'a stamped bat',
      "a stuntman's knee",
      'a twisted slipper',
      "a werewolf with it's throat cut",
      'an over inflated dinghy',
      'badly battered road kill',
      "Brian May's plughole",
      "John Wayne's saddlebags",
      "Pete Burns' lips",
      "Terry Waite's allotment",
      'that bathroom door in The Shining',
      'the Japanese flag',
      'the south end of a badger going north'
    ],
    sweat: [
      'a blind lesbian in a fish shop',
      'a dyslexic on Countdown',
      'a fat slag in a disco',
      'a gypsy near an unlocked shipping container',
      'a gypsy with a mortgage',
      'a midget nun at a penguin shoot',
      'a paedo during a prison riot',
      'a pregnant nun',
      'a white mouse in a tampon factory',
      'a whore in a confessional',
      'Gary glitter at PC World',
      'Joseph Fritzel on MTV Cribs',
      'Mike Tyson at a spelling bee'
    ],
    tight: ["a camel's arsehole in a sandstorm", "a mouse's ear", 'a Scotsman'],
    wet: [
      "a bathmaid's elbow",
      "a spastic's chin",
      'a well diggers arse',
      'an English summer',
      'an Italian cruise ship',
      "an otter's pocket"
    ]
  }
};

const why = [
  "I'd like there to be more stuff for little kids.",
  'It could do with with a bit more life here, a bit more variety, more types of shops.',
  "Festivals, things that appeal to more people rather than being targeted as for a particular type of people. So it's more mixed up.",
  "Why don't they take the rates away from businesses?",
  'The council was a shame.',
  "It's a shame.",
  "Who's going to have the nerve to start something off?",
  'You need to be an optimist. With a forward looking council.',
  'Make more of the river.',
  "Carmerthen's done it well. Llanelli hasn't. It's just charity shops here. We like charity shops but not when there's just those.",
  "I'd say try and see your potential. I think there's huge potential here, to be culturally and artisically distinctive, so visitors don't jsut come for the beach.",
  "If there was live music I'd come more often.",
  'We need a Primark and Matalan. Is there one at the top?',
  "The development was a bit controversial. Out-of-town shopping should be in the centre of town. Today with the Farmers' market, that's good.",
  "It's high time that Ocky White's was occupied.",
  'If they kept the businesses here in the centre of town...',
  "Some people didn't want M&S in town. They can see that it brings people in.",
  'And the out-of-town is spoiling it.',
  "You can put loads of things down if you want to but there's loads of good things.",
  "I think people come here for the countryside. It's very beautiful. Local people don't appreciate it.",
  "Come back in August for the Jam. They have big skate bands. It's brilliant!",
  "Carmarthen has M&S and all the others in the middle. I'd like to think that we've done something towards things getting better.",
  'Each time you use a different bike, you learn the tricks all over again.',
  "You've got to get used to the feeling of going over bumps.",
  "You can't do it if you're not mentally ready.",
  "It's too late!",
  "They've spoilt it.",
  "They could have done so much. It's too late now.",
  "Carmarthen's got it right. Incorporated the old with the new. Kept the market right in the middle of it.",
  "People have to develop. You've got to accept that, but they split it. They went out of town.",
  "It's got roots. It's a lineage if you pass it down. If people respected the past they'd be more grounded in the future.",
  "It needs another direction to revitalise it. What that direction would be I don't know. Sad that a place that was once so bustling is so depressed.",
  "It seems quite intimidating at first, 'cos there's people there, but then it's alright.",
  "It's hard to learn. You have to push yourself and have a lot of balls.",
  "When you know people that other people are scared of, people don't pick trouble with you.",
  "If the bike's light you can go about five foot high. It's like flying!",
  'You do lots of falling off!',
  "Skating's like flying.",
  'Confidence is the main thing.'
];

const where = [
  'I got involved running a charity caring for carers, Pembrokeshire Crossroads.',
  'All she wanted to do was leave. She went to Birmingham.',
  "I ride for Spreadeagle, a grassroots company with local projects, helping out kids who can't afford expensive boards.",
  "His father's interested in archaeology and my grandson has followed in his footsteps. He always gives you a stone as a present.",
  "We like sitting by the river bridge watching the swans, but there's none there this year.",
  'We holiday in Tenby, we come down every weekend.',
  'The wives we leave to shop. We catch up on the football.',
  "So from the age of six or seven it's always been somewhere to come.",
  "I love the coast; Burton, it's great for crabbing.",
  'I like meeting new people.',
  'I skate and do parkour.',
  'The first jam was last year.',
  "Up on the racecourse, go down the road, past the farm. There's a lovely walk.",
  "We're going to Tenby tomorrow.",
  "We're spending six months and deciding whether to move here.",
  "My dogs have had a psychological therapist assess them to see if they are suitable to go to the Alzheimer's unit.",
  "I had an aeroplane and used to fly over to see a friend in St David's . Then I based my plane here.",
  'Been coming here all my life. Came when I was younger for night clubs, back in the day…',
  "We've had a caravan down here for four or five years.",
  "It's a ritual, she goes shopping and he has a coffee and the dog can sit outside.",
  "My sister and I were horse riders so our parents dropped us off and we'd spend most of the summer working in the stables.",
  "I met my sons' dad working at the stables.",
  "I like the slower pace of life. I've got a bike. I like to have adventures. Not a lot of traffic.",
  'I come here to see friends.',
  'I missed the bus. I had to walk about ten miles.',
  "The nice thing about that is you've got time to stop and take photos, it's quite a revelation.",
  'I came from Scotland ten years ago.',
  'Called S&L it sold all sorts of trinkets.',
  "I'm being interviewed by artists!",
  'I came to school in Haverfordwest.',
  "We've bought paintings here. When each of our daughters were born we bought them a painting.",
  'We often come in for a wander round on a Saturday.',
  'I like slow-moving. In the city, you look down the street and all you see is heads',
  'I set the museum up, bought a Spitfire as a restoration project. We finally kept it at the airfield and we managed to get a portacabin, which is up at the airfield too.',
  "We're in the X Games!",
  "I'm learning to drop off.",
  'I started on the Euro Gap and then the Flatbanks.',
  'I tend to come here rather than Carmarthen.',
  'The kids have sampled everything off the market today. They even knocked over  the cheese, so of course we bought some.',
  "It's the last day of school, just had an English exam.",
  'Some of them bailed.',
  "The books in the charity shops are good here. It's an interest of mine.",
  "I've just been up to the castle. It's great, the kids were making daisy chains and climbing on the walls.",
  "Down at the skate park it's easy to keep the peace.",
  'Here, you can sit with the dogs and be outside to have your lunch.',
  'Skating.',
  "Driving around at night there's hardly any cars on the road.",
  "I just come in for a haircut and a shop for things that I can't get in Fishguard.",
  "You go away but you can't wait to come home.",
  'A lot of different coach trips come to Haverfordwest.',
  'The kids in the grammer school used to have a canoe race down there.',
  'I did start off coming here to do parkour. The people who sponsor me (Kinetic Body Art) told me to to make videos here.',
  "My mum's got a new shop on North Street, a place where teenagers can gather.",
  'One major thing is I like sitting by the river, lighting a fire and watching the wildlife.',
  'I used to come here as a youth to the discos!',
  "It's lovely to sit by the riverside on a day like this.",
  "We don't come here socially.",
  'We hang around here or at Johnston.',
  "It's good for skateboarding here. There's quite a lot here. I like coming here. We get the bus up.",
  "We've got our school uniforms in our bags. We came here straight from school."
];

const what = [
  'I go to the big cities for my holidays; Blackpool usually, or London. I got family in London.',
  "At the top there's a monument to a man who was burnt to death for his religious beliefs.",
  "It's rubbish, there's nothing to do. Pembroke's better, there's more stuff to do, I've got more friends there.",
  'In the 1400s people would still hear Flemish spoken in the town. the Welsh people would stay outside of town.',
  "Over five years it's got worse rather than better, from the empty shop perspective.",
  "It's great down the skate park.",
  "Most councils would love a centre like ours. Send them a picture and say ‘How would you like to have a village that that?'",
  "It's getting better.",
  "It's sad to see the empty shops.",
  'The majority of people are friendly.',
  "It's getting run down, three years ago the main street was bustling. It takes the heart and soul out of the place.",
  "It's got character. It's laid back.",
  "It's sad to see the empty shops.",
  'The economy is difficult.',
  'King Charles I or II married a local girl, Lucy Walton, but she (conveniently) died before he became King.',
  "It's a quaint little place.",
  'They have quite a decent little market.',
  'Narbeth just feels different. Haverfordwest is more mainstream.',
  "Ocky White's; when it closed he said ' we just can't compete.'",
  "It's a lovely place, but the out-of-town takes people and shops out from the centre.",
  'The council building is in the prime spot, on the river.',
  "It's a bit dead.",
  'The out-of-town could have been connected.',
  'People said how lovely it was about the river.',
  "It's lovely. We thought it was only one street, then we went down to the river.",
  'The river makes it. It keeps the place alive.',
  'Nice place!',
  "Some Saturdays it's heaving.",
  "There are lights for the evening, they stay on 'til ten. People stay as as long as they can.",
  'I want a bigger skate park!',
  "I don't want an indoors skate park, because you'd have to pay and there would be more rules.",
  "It's a fun place.",
  'Got fun and nice people. Although some people can be a bit feisty.',
  "In The Courts it's tough and there's druggies. But round here it's nice.",
  'In The Courts there are some nice people.',
  "In Haverfordwest we've got the secret of eternal youth!",
  'Rates on this building were about £60,000 per year. The council decided to have out-of-town shopping.',
  'This was a very busy waterway.',
  'It was the busiest port in Wales.',
  'I can remember the railway bridge used to open and let boats through.',
  "It's a very lovely run along the river, along the villages and Hook.",
  'The archives have moved.',
  "The castle, that's how Oliver Cromwell left it!",
  'Next to that blue building on the other side of the bridge was the iron works.',
  'I heard that someone jumped off the bridge.',
  "Down river there's a big stone. That's the boundary. It's amazing. Local people don't go but lots of visitors come.",
  "This water development. It's all in the last 40 years.",
  "Some people say there's ghosts in the tunnel by Morrisons.",
  "At Christmas time it's nicely decorated.",
  'Opposite here, years ago, there was an iron works.',
  "We've got photos of boats up there.",
  "The mayor of Haverfordwest does 'Beating the Bounds'. He inspects the boundary of his parish. On a nice evening it's lovely.",
  "We've got the castle and the river.",
  "There's still Clarks.",
  'Haverfordwest is fading, from an economic point of view, which is sad.',
  'We love the independent shops in Narbeth. People know about it.',
  "It's got all the basics: nice river, scenery, castle, ancient historic town.",
  'The castle, towering over the town, but nobody pays much attention to it.',
  "It's better than most places. It's a fun place to live.",
  "It's pretty lively!",
  "It's an actual town, a good one.",
  "People give Haverfordwest a bad name but it's not. It's friendly.",
  "It's like back home, lots of independent shops didn't want Tescos.",
  "I didn't want to bring my children up in the city centre. I wouldn't want to live anywhere else. It's near to everywhere.",
  'Everyone is nice to everyone.',
  'Here there are people you talk with.',
  'It does get a bit violent here. There are less fights than there used to be.',
  "It's alright. There's lots of shops.",
  'Nice place in the Summer.',
  "For the atmosphere: it's a good vibe.",
  "It's a nice place to visit. It can be friendly. It can be unfriendly. More than it should be.",
  "I find the commmunity in this area is quite tight and loving. There's a lot of people who care about the place.",
  "It's one of the cleanest towns I know.",
  "It's changed to the worse, I reckon. The castle will always remain.",
  'As a kid I hated school here.',
  'The out-of-town is choas for parking.',
  "You overlook the Preseli Hills and the dragon's tail.",
  "This was a cafe, it's closed down now.",
  "It's so quiet and laid back.",
  "Haverfordwest has imrpoved a lot. Like this square, it's completely change.",
  "The George on Market Street is a very green restaurant and it's organic. And they have nice chocolate.",
  "We don't know Haverfordwest at all.",
  'Narbeth used to be run down.',
  'Tuesday to Saturday is heaving.',
  'If it was indoors it would be more controlled.',
  'This is the civilised bit of Wales.',
  "They've split the town. M&S and Boots used to be in the centre. I haven't been down this end for a long time.",
  'Bridge Street is changed.',
  "Years ago M&S wanted to come and they wouldn't let them.",
  "Thank you for being here. You've brought me and my friend together.",
  "It's quite a friendly community.",
  'Better shops than Milford.',
  "The sun's out in Haverfordwest.",
  'Morrisons, Tescos.',
  "It's become quite popular.",
  "The skate park. It's better since that came. It gets people out."
];

const who = [
  "We've just finished school today.",
  'I come from Merthyr, where the real Welsh people come from.',
  "We can't have cakes, we're on the Herblife diet, where you just drink protein shakes.",
  "Our family and friends and roots are here. We're out in the sticks.",
  "We feel like we're country bumpkins.",
  "We've been best friends since we were 11. And when we were about 17 I started dating her cousin, and I had my little girl. So now we're family!",
  "My daughter's expecting twins. My grandson is interested in the castle.",
  "I was born in Haverfordwest. When I was younger I didn't appreciate it, all the history, the coast.",
  "My roots are here and I don't like it when people slag it off.",
  'I only met some of these people today.',
  "I'm feeling adventurous today!",
  "I live nearby, about 10 miles away, we come for the shops, where we live it's so rural … we come for the dentist.",
  "How long have I lived here? The last ten years. Found it on the map, nothing dragged us. It's somewhere so you're not sat in the caravan all week.",
  "We've been busy for 40 years, and the children have grown up now.",
  'My mother lives here, we like shopping and the castle.',
  "I've lived here a long time, since I was nine or ten years old.",
  "I'm back from Birmingham now, though; I was homesick.",
  "I'm from Portugal.",
  'I knew some people.',
  "I didn't know people.",
  "I'm what they call a Longneck; born in Haverfordwest and lived here all my life.",
  "I've always thought it was the best town in Wales.",
  "We live on the coast, it's beautiful.",
  'My friends are a funny group.',
  "My father-in-law's grandparents lived in Haverfordwest. His name was Owen.",
  "We used to come years ago and it's lovely to reminisce. My husband's family are from here.",
  "We're from Treorchy.",
  "I've lived this way since 1995. I'm from Cardiff originally; we'd always come to Pembrokeshire.",
  "My Gran was friends with the milkman in Milford Haven and we'd stay in his house.",
  "I'm from Milford.",
  "I'm looking at the mortar rather than the bricks. It gives you a sense of belonging.",
  'Nothing can substitute for being part of these ground roots.',
  "I've been coming here for the last 20 years. We like to have a wander round, see what's changed.",
  "I've come back to keep an eye on my mum and my best friend's had a daughter. She's got new finger paints!",
  "He's a champion barman.",
  "I'm from Hook originally, I know it here quite well.",
  "I'm a village boy. This is a city as far as I'm concerned. I'm still a village boy. I've got work colleagues here.",
  "My daughter's been here every year since she was born.",
  'We met when I was on holiday in Hook.',
  "I was born here. They usually call them Longnecks - something to do with the rivalry with Milford Haven, something to do with they like looking over garden walls; they're nosy, like.",
  'I moved down from Newport, Gwent. My Dad works down here.',
  "We moved about two years ago. At first I wanted to stay there. But I've made friends here now. The skate park's helped.",
  'I had an accident, broke my wrist, chipped my tooth. I was out of action for two weeks.',
  'People are hypocrites.',
  "She had her tail trodden on, things dropped on her head. She wasn't bothered.",
  'She just loves it, ‘cos she gets biscuits.',
  'Friendly, even by mad Welsh standards.',
  "It's a mix of boys and girls, different ages."
];
