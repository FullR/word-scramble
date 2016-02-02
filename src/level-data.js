import blankWord from "util/blank-word";

export default [
  {"word": "mischievous", "definition": "causing annoyance, harm, or trouble", "sentence": "Upbeat and talkative, he sports a mischievous grin that refuses to fade."},
  {"word": "conscientious", "definition": "careful and painstaking; particular, meticulous, scrupulous", "sentence": "Maddie is a conscientious worker who completes every task."},
  {"word": "rhythm", "definition": "movement or procedure with uniform or patterned recurrence of a beat, accent , or the like", "sentence": "I like the rhythm of the song but not the words."},
  {"word": "privilege", "definition": "a right, immunity, or benefit enjoyed by a person beyond the advantages of most", "sentence": "Having a driver’s license is a privilege that can be taken away if a driver is not responsible."},
  {"word": "sincerely", "definition": "free of deceit, hypocrisy, or falseness", "sentence": "Daniel is sincerely trying to do a good job in the office; it's just that he isn't an organized person. "},
  {"word": "humorous", "definition": "funny; comical", "sentence": "The posts range from YouTube videos and humorous political cartoons to traditional articles."}
].map((word) => {
  word.sentence = blankWord(word.sentence, word.word);
  return word;
});
