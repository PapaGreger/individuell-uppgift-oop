function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

Color.prototype.rgb = function () {
  return [this.r, this.g, this.b];
};

Color.prototype.rgba = function (alpha) {
  return [this.r, this.g, this.b, alpha];
};

const hexConvert = (rgbComponent) => {
  const hexComponent = rgbComponent.toString(16);
  return hexComponent.length == 1 ? "0" + hexComponent : hexComponent;
};

Color.prototype.hex = function () {
  return `#${hexConvert(this.r)}${hexConvert(this.g)}${hexConvert(this.b)}`;
};

Color.prototype.hexa = function (alpha) {
  return `#${hexConvert(this.r)}${hexConvert(this.g)}${hexConvert(
    this.b
  )}${hexConvert(Math.round(255 * alpha))}`;
};

const red = new Color(255, 0, 0);
const green = new Color(0, 255, 0);
const blue = new Color(0, 0, 255);

console.log(red.rgb());
console.log(red.rgba(0.5));
console.log(red.hex());
console.log(red.hexa(0.5));
