import blankWord from "util/blank-word";

export default [
  {"word": "aberration", "definition": "deviation from a right, customary, or prescribed course", "sentence": "They described the outbreak of violence in the area as an aberration."},
  {"word": "banal", "definition": "lacking originality or commonplace", "sentence": "He made some banal remarks about the weather."},
  {"word": "sagacity", "definition": "wisdom", "sentence": "He was a journalist of surprising sagacity given his education."},
  {"word": "indulgent", "definition": "having or indicating a tendency to be overly generous to or lenient with someone", "sentence": "She gave her son an indulgent smile."},
  {"word": "garrulous", "definition": "given to constant trivial talking", "sentence": "The garrulous woman held up the checkout line as she rambled on to the cashier about his pet squirrel."},
  {"word": "guile", "definition": "the use of clever and usually dishonest methods to achieve something", "sentence": "My neighbor was so full of guile that he couldn’t be trusted to give someone the correct time of day."},
  {"word": "assiduous", "definition": "hard-working", "sentence": "That was very assiduous of you to finish those financial reports weeks ahead of schedule."},
  {"word": "omniscient", "definition": "characterized by unlimited knowledge", "sentence": "He thinks he knows what is best for everybody, but as far I know he is not omniscient."},
  {"word": "enervate", "definition": "to render ineffective or inoperative", "sentence": "A tedious chore like that could enervate him."},
  {"word": "perfidy", "definition": "treachery", "sentence": "Sam had a poor reputation, more for his acts of perfidy than for anything else."}
].map((word) => {
  word.word = word.word.trim();
  word.definition = word.definition.trim();
  word.sentence = blankWord(word.sentence, word.word).trim();
  return word;
});
