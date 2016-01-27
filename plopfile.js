
const prompt = (name, message, type, validate) => ({type: type || "input", name, message, validate});

module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Barebones React Component",
    prompts: [
      prompt("name", "Name?")
    ],
    actions: [{
      type: "add",
      path: "src/components/{{dashCase name}}.js",
      templateFile: "plop-templates/component.hb"
    }]
  });
};
