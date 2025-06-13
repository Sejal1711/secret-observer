import { useState } from "react";
import "./index.css";

const behaviourKeywords = {
  soft: [
    "shy", "quiet", "introvert", "bookworm", "gentle", "calm", "polite",
    "lowkey", "soft-spoken", "emotional", "reserved", "sweet", "kind",
    "sensitive", "empathetic", "dreamy", "thoughtful", "listener",
    "softie", "peaceful", "romantic", "timid", "caring", "humble",
    "daydreamer", "chill", "artsy", "deep", "innocent"
  ],
  loud: [
    "flirty", "funny", "bold", "talkative", "party", "confident",
    "sarcastic", "loud", "tease", "outgoing", "bubbly", "dramatic",
    "spontaneous", "chaotic", "noisy", "hyper", "fearless", "rebellious",
    "adventurous", "leader", "center of attention", "daring", "wild",
    "alpha", "lively", "showoff", "glamorous", "social butterfly"
  ]
};

const specificResponses = {
  shy: {
    sweet: "He's like a shy little moonflower 🌙 — opens up only for the right soul.",
    sarcastic: "Shy? So basically, a professional wall-hugger. 😂",
    sassy: "Shy? Cute, but girl... unlock that mystery already! 💅"
  },
  flirty: {
    sweet: "He’s got that flirty charm — like a romcom lead waiting to happen 💘",
    sarcastic: "Flirty much? Wow, he must think he’s God’s gift to Earth 😏",
    sassy: "Oh he’s flirty? Time to play the game, sugar 💋"
  },
  quiet: {
    sweet: "So soft-spoken, like a cozy whisper on a rainy day ☔",
    sarcastic: "Quiet? Or buffering in real life? 🤨",
    sassy: "He’s the strong, silent type? Mmm mysterious! 🔥"
  },
  confident: {
    sweet: "His confidence lights up the room like sunshine ☀️",
    sarcastic: "Confidence or just audacity? 🤷‍♀️",
    sassy: "Yasss king! Confidence is your crown 👑"
  },
  bookworm: {
    sweet: "Always nose-deep in stories — so dreamy 📚✨",
    sarcastic: "Cool, he’s dating his books instead of you 📖🙄",
    sassy: "Book boy? Swipe that library card, baby! 📕💅"
  },
  bold: {
    sweet: "Bold and bright, like a burst of color in a gray world 🌈",
    sarcastic: "Bold? More like allergic to subtlety 😐",
    sassy: "Bold is the new hot. Serve it loud, babe 🔥"
  },
  calm: {
    sweet: "Like the ocean at dawn — serene and comforting 🌊",
    sarcastic: "So calm he might as well be asleep 😴",
    sassy: "Too calm? Might need to poke him with a stick 🪵💁‍♀️"
  },
  sarcastic: {
    sweet: "He’s got that dry wit — like a cinnamon bun with a twist 🌀",
    sarcastic: "Sarcastic? Oh look, a clone of me 🪞",
    sassy: "Okay sarcasm king, roast me next 🔥"
  },
  talkative: {
    sweet: "So chatty and warm — like a cozy podcast 🎙️",
    sarcastic: "Talkative? Yeah, silence is extinct now 🦕",
    sassy: "He talks? Good. Let him spell out his love too 💅"
  },
  party: {
    sweet: "He’s the vibe at every gathering 🎉",
    sarcastic: "Party boy? Hope he remembers names at least 🥴",
    sassy: "If he’s a party, then you’re the guest of honor 💃"
  },
  tease: {
    sweet: "Playful and charming — like a flirty breeze 🍃",
    sarcastic: "Tease? Ugh, emotional dodgeball again 🙄",
    sassy: "If he’s teasing, tease him *twice as hard*, babe 💋"
  },
  outgoing: {
    sweet: "Lights up every place he walks into 🌟",
    sarcastic: "Outgoing? Aka allergic to peace and quiet 🙃",
    sassy: "He’s out and about? Time to steal his spotlight 💅"
  },
  bubbly: {
    sweet: "His smile could cure bad days ☀️✨",
    sarcastic: "Bubbly? Like soda — fun, but sticky 💭",
    sassy: "Bubbly boy? Let’s pop the charm, darling 🥂"
  },
  dramatic: {
    sweet: "He feels deeply — it’s like poetry in motion 🎭",
    sarcastic: "Dramatic? He missed his calling in Bollywood 💥",
    sassy: "Drama king? You better grab the popcorn 🍿"
  },
  spontaneous: {
    sweet: "He keeps life exciting — never a dull moment 🎢",
    sarcastic: "Spontaneous? Code for last-minute chaos 💣",
    sassy: "He’s spontaneous? Buckle up, babe 🚀"
  },
  chaotic: {
    sweet: "He’s a beautiful mess — in the best way 🌀",
    sarcastic: "Chaos level: professional homewrecker 🏚️",
    sassy: "Chaotic boys? Yes please. Drama is cardio 💅"
  },
  noisy: {
    sweet: "His laughter fills the room — pure joy 🔊",
    sarcastic: "Noisy? Or allergic to volume control? 🤯",
    sassy: "Noisy? Well, as long as he’s screaming *your* name 💁‍♀️"
  },
  lowkey: {
    sweet: "He’s effortlessly charming without even trying 🕶️",
    sarcastic: "Lowkey? Or just emotionally in airplane mode ✈️",
    sassy: "Lowkey boys? We love a secret obsession 👀"
  },
  reserved: {
    sweet: "Quiet on the outside, galaxy on the inside 🌌",
    sarcastic: "Reserved? More like locked up with 3 padlocks 🔒",
    sassy: "Reserved? Let’s crack that mystery, queen 👑"
  },
  sensitive: {
    sweet: "Feels deeply and cares even deeper 💗",
    sarcastic: "Sensitive? Handle with sarcasm... not. 😬",
    sassy: "Sensitive boys? A little drama never hurt 💅"
  },
  empathetic: {
    sweet: "He really *gets* people — heart first 💞",
    sarcastic: "Empathetic? Okay therapist-in-training 🛋️",
    sassy: "Empathy? Now that’s boyfriend material 💍"
  },
  thoughtful: {
    sweet: "Every action feels like a handwritten note ✉️",
    sarcastic: "Thoughtful? Or just overthinking *again*? 🙃",
    sassy: "He’s thoughtful? Better be thinking about you 💁‍♀️"
  },
  listener: {
    sweet: "He actually *listens*. Total green flag 💚",
    sarcastic: "Listener? Hope he doesn't just zone out in style 🎧",
    sassy: "Listener boys? Talk his ears off, queen 👑"
  },
  softie: {
    sweet: "Melts hearts like marshmallows in cocoa ☕💗",
    sarcastic: "Softie? Or just allergic to confrontation 😆",
    sassy: "Softies make the best cuddle buddies 🧸"
  },
  peaceful: {
    sweet: "He’s like breathing in nature — calm and grounding 🌿",
    sarcastic: "Peaceful? Or just sleeping with eyes open 💤",
    sassy: "Peaceful boys? Cute. Now bring the spice 🌶️"
  },
  timid: {
    sweet: "Shy glances and quiet smiles — adorable 🥺",
    sarcastic: "Timid? Blink twice if you need courage 🫣",
    sassy: "Timid? Let’s bring the fire and watch him blush 🔥"
  },
  caring: {
    sweet: "Every small gesture screams love ❤️",
    sarcastic: "Caring? Until he forgets your birthday 😒",
    sassy: "Caring boys? Add to cart, please 🛒💋"
  },
  humble: {
    sweet: "He shines but never brags — that’s rare ✨",
    sarcastic: "Humble? Or just too lazy to flex 🤷‍♀️",
    sassy: "Humble kings don’t need to say much. We see it 👑"
  },
  daydreamer: {
    sweet: "Lost in thoughts and love songs 🎶🌤️",
    sarcastic: "Daydreamer? Earth to Romeo, come back 👽",
    sassy: "Daydreaming about you? He better be 😘"
  },
  artsy: {
    sweet: "His mind is a gallery, and love is his canvas 🎨",
    sarcastic: "Artsy? Prepare for 3AM sketchbook rants 🖌️",
    sassy: "If he’s artsy, you're the masterpiece 🖼️"
  },
  deep: {
    sweet: "Talks about the stars and your soul 🌌💬",
    sarcastic: "Deep? Or just confusing for no reason 😵‍💫",
    sassy: "Deep boys are cute... until it’s 3AM philosophy 🤯"
  },
  innocent: {
    sweet: "Pure-hearted and adorably clueless 🕊️",
    sarcastic: "Innocent? Don’t fall for the puppy eyes 🐶",
    sassy: "Innocent? More like a silent heartbreaker 💘"
  }
};

const chatbotResponses = {
  sweet: {
    soft: "He's totally into the soft type — shy, sweet, and a little mysterious just like you. 💞",
    loud: "He clearly adores bold girls who bring the drama and the dazzle 💃✨",
    neutral: "Still figuring out his type — keep the observations coming, love 🕵️"
  },
  sarcastic: {
    soft: "Oh, he likes the shy types? How thrilling. Maybe he’ll ask you out… in 5 years. 🙄",
    loud: "So he likes the loud, dramatic ones? Hope he packed earplugs. 🔊😂",
    neutral: "He’s playing mystery man. Sherlock might need backup 🧐"
  },
  sassy: {
    soft: "Aww he’s into the quiet, shy ones? Looks like we’ve got a sucker for sweethearts 💅",
    loud: "He loves bold girls? Get your heels, drama, and fire ready, queen 🔥👠",
    neutral: "He’s being all cryptic, huh? Time to turn up the heat and crack the case 🔍💃"
  }
};


function classifyObservation(text) {
  const lower = text.toLowerCase();
  for (let word of behaviourKeywords.soft) {
    if (lower.includes(word)) return { keyword: word, type: "soft" };
  }
  for (let word of behaviourKeywords.loud) {
    if (lower.includes(word)) return { keyword: word, type: "loud" };
  }
  return { keyword: null, type: "neutral" };
}

export default function App() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState([]);
  const [score, setScore] = useState({ soft: 0, loud: 0 });
  const [mood, setMood] = useState("sweet");
  const [finalVerdict, setFinalVerdict] = useState("");
  const [showDecisionPrompt, setShowDecisionPrompt] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { keyword, type } = classifyObservation(input);
    const newLog = [...log, { text: input, mood }];

   let botResponse;
if (keyword && specificResponses[keyword] && specificResponses[keyword][mood]) {
  botResponse = specificResponses[keyword][mood];
} else if (keyword) {
  botResponse = "Tell me more 😌";
} else {
  botResponse = chatbotResponses[mood][type];
}


    newLog.push({ text: botResponse, isBot: true });

    const newScore = {
      soft: score.soft + (type === "soft" ? 1 : 0),
      loud: score.loud + (type === "loud" ? 1 : 0)
    };

    setLog(newLog);
    setScore(newScore);
    setInput("");

    if (newScore.soft + newScore.loud >= 3 && !finalVerdict) {
      setShowDecisionPrompt(true);
    }
  };

  const handleFinalVerdict = () => {
    const result =
      score.soft > score.loud
        ? chatbotResponses[mood]["soft"]
        : chatbotResponses[mood]["loud"];
    setFinalVerdict(result);
    setShowDecisionPrompt(false);
  };

  return (
    <div className="container">
      <div className="box">
        <h1> Secret Observer 💌</h1>
        <p className="description">
          Ever wondered if your crush is more of a softie or a firecracker? <br />
          Just describe how he acts — and let our mood-based bot decode the vibe! <br />
          Choose a chatbot mood (sweet, sarcastic, or sassy) and spill the tea. ☕ <br />
          The bot not only reads the vibe — it also tells you what type of girls he probably prefers! 😏💘
        </p>

        <div className="mood-selector">
          <label>Choose chatbot mood:</label>
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            <option value="sweet">Sweet</option>
            <option value="sarcastic">Sarcastic</option>
            <option value="sassy">Sassy</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="So..is he shy ?? flirty???🥰"
          />
          <button type="submit">Submit</button>
        </form>
        <p className="note">✨ Enter at least 3 traits to unlock the final verdict ✨</p>

        {log.map((entry, i) => (
          <p key={i} className={entry.isBot ? "bot" : "user"}>
            {entry.text}
          </p>
        ))}

        {showDecisionPrompt && !finalVerdict && (
          <div className="prompt">
            <p>Do you want to continue observing ?</p>
            <button onClick={() => setShowDecisionPrompt(false)}>
              Continue
            </button>
            <button onClick={handleFinalVerdict}>Get Verdict</button>
          </div>
        )}

        {finalVerdict && <div className="final">💖 {finalVerdict}</div>}
      </div>
    </div>
  );
}
