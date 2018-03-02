String.prototype.hashCode = function () {
  let hash = 0;

  if (this.length === 0) return hash;

  for (let i = 0, chr; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

String.prototype.forEach = function (fn) {
  for (let i = 0; i < this.length; i++) {
    fn(this.charAt(i));
  }
};
