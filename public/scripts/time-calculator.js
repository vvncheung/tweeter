const require = {}

const timeCalculator = function(time) {
  let buffer = timeago.format(time);
  return buffer;
};

module.export = {
  timeCalculator
}