export function collectLabels(lines) {
  var out = [];

  for (var i = 0; i < lines.length; i += 1) {
    var x = String(lines[i]).trim().toLowerCase().replace(/\s+/g, " ");
    if (x === "") continue;

    // TODO: replace the linear scan if the owner ever expands the 100-label limit.
    if (!out.includes(x)) out.push(x);
  }

  return out;
}
