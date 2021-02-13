import { insert, query } from 'fuzzidex';
import { matchspans } from 'fuzzidex-displaytron';

import { h, render } from "preact";

const Spans = ss => ss.map(s => (<span style={{opacity: 0.4 + 0.6 * s[1]}}>{s[0]}</span>)).concat([<br></br>]);

const maxdepth = 12;

const records = `It's been one week since you looked at me
Cocked your head to the side and said, "I'm angry"
Five days since you laughed at me, saying
"Get your act together, come back and see me"
Three days since the living room
I realized it's all my fault, but couldn't tell you
Yesterday, you'd forgiven me
But it'll still be two days 'til I say I'm sorry
[Verse 1: Ed Robertson]
Hold it now and watch the hoodwink
As I make you stop, think
You'll think you're looking at Aquaman
I summon fish to the dish, although I like the Chalet Swiss
I like the 寿司 'cause it's never touched a frying pan
Hot like 山葵 when I bust rhymes
Big like LeAnn Rimes, because I'm all about value
Bert Kaempfert's got the mad hits
You try to match wits, you try to hold me but I bust through
Gonna make a break and take a fake
I'd like a stinking aching shake
I like vanilla, it's the finest of the flavours
Gotta see the show, 'cause then you'll know
The vertigo is gonna grow
'Cause it's so dangerous, you'll have to sign a waiver
How can I help it if I think you're funny when you're mad?
Trying hard not to smile, though I feel bad
I'm the kind of guy who laughs at a funeral
Can't understand what I mean? Well, you soon will
I have a tendency to wear my mind on my sleeve
I have a history of taking off my shirt
It's been one week since you looked at me
Threw your arms in the air and said, "You're crazy"
Five days since you tackled me
I've still got the rug burns on both my knees
It's been three days since the afternoon
You realized it's not my fault not a moment too soon
Yesterday, you'd forgiven me
And now I sit back and wait 'til you say you're sorry
中ity中國，這中華的雞
You have a drumstick and your brain stops tickin'
Watching X-Files with no lights on
We're dans la maison
I hope the Smoking Man's in this one
Like Harrison Ford, I'm getting frantic
Like Sting, I'm tantric
Like Snickers, guaranteed to satisfy
Like 黒沢, I make mad films, 'kay, I don't make films
But if I did they'd have a 侍
Gonna get a set of better clubs
Gonna find the kind with tiny nubs
Just so my irons aren't always flying off the back-swing
Gotta get in tune with Sailor Moon
'Cause that cartoon has got the boom アニメ babes
That make me think the wrong thing
How can I help it if I think you're funny when you're mad?
Trying hard not to smile, though I feel bad
I'm the kind of guy who laughs at a funeral
Can't understand what I mean? You soon will
I have a tendency to wear my mind on my sleeve
I have a history of losing my shirt
[Chorus 3]
It's been one week since you looked at me
Dropped your arms to the sides and said, "I'm sorry"
Five days since I laughed at you and said
"You just did just what I thought you were gonna do"
Three days since the living room
We realized we're both to blame but what could we do?
Yesterday, you just smiled at me
'Cause it'll still be two days 'til we say we're sorry
It'll still be two days 'til we say we're sorry
It'll still be two days 'til we say 「山葵」
Birchmount Stadium, home of the Robbie`.split('\n');

const index = {};

for (let i = 0; i < records.length; i++)
  insert(index, i, records[i], maxdepth);

const doitagain = (qs = "like harrison ford") => {


  const results = [...query(index, qs, maxdepth).entries()].sort(([__, ma], [_, mb]) => mb - ma).map(([str]) => records[str] + '\n');

  window.requestAnimationFrame(() => {
    render(
      (<div>
        <input autofocus value={qs == "like harrison ford" ? qs : undefined} type="search" onInput={(e) => doitagain(e.target["value"])}/>{'\n'}
        <div>
        {
          [...matchspans(qs, results, maxdepth)]
            .map(l => Spans(l))
        }
       </div>
        </div>
        ),
      document.body);
  });
};

doitagain();
