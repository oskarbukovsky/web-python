(function initConsoleLogDiv() {


  if (console.log.toDiv) {
    return;
  }

  function toString(x) {
    return typeof x === 'string' ? x : JSON.stringify(x);
  }

  var log = console.log.bind(console);
  var error = console.error.bind(console);
  var warn = console.warn.bind(console);
  var table = console.table.bind(console);
  var id = 'console-log-div';

  function createOuterElement() {
    var outer = document.getElementById(id);
    if (!outer) {
      outer = document.createElement('fieldset');
      outer.id = id;
      document.body.appendChild(outer);
    }
    outer.classList.add('id');

    var style = outer.style;
    // style.width = '100%';
    // style.minHeight = '200px';
    style.fontFamily = 'monospace';
    style.marginTop = '20px';
    style.marginLeft = '10px';
    style.marginRight = '10px';
    style.whiteSpace = 'pre-line';
    style.border = '1px solid black';
    style.borderRadius = '5px';
    style.padding = '5px 10px';
    style.position = 'absolute';
    style.top = '0px';
    style.right = '0px';
    style.width = '30vw';
    style.height = 'calc(100vh - 96px)';
    return outer;
  }

  var logTo = (function createLogDiv() {

    var outer = createOuterElement();

    var caption = document.createTextNode('Console output');
    var legend = document.createElement('legend');
    legend.appendChild(caption);
    outer.appendChild(legend);

    var div = document.createElement('div');
    div.id = 'console-log-text';
    outer.appendChild(div);

    var span = document.createElement('span');
    span.classList.add('console-input');
    span.innerHTML = ">";
    document.body.appendChild(span);

    var console = document.createElement('input');
    console.type = "text";
    console.id = "console-input";
    console.style = "font-family: monospace; margin-top: 20px; margin-left: 10px; margin-right: 10px; white-space: pre; border: 1px solid black; border-radius: 5px; padding: 5px 10px;";
    document.body.appendChild(console);

    return div;
  }());

  function printToDiv() {
    var msg = Array.prototype.slice.call(arguments, 0)
      .map(toString)
      .join(' ');
      var div = document.createElement('div');
      div.innerHTML = msg;
      document.getElementById("console-log-text").appendChild(div);
    //var text = logTo.textContent;
    //logTo.textContent = text + msg + '\n';
  }

  function logWithCopy() {
    log.apply(null, arguments);
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift('<div class="info"> ✅ INFO:');
    args.push('</div>');
    printToDiv.apply(null, args);
  }

  console.log = logWithCopy;
  console.log.toDiv = true;

  console.error = function errorWithCopy() {
    error.apply(null, arguments);
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift('<div class="error"> ❌ ERROR:');
    args.push('</div>');
    printToDiv.apply(null, args);
  };

  console.warn = function logWarning() {
    warn.apply(null, arguments);
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift('<div class="warn"> ⚠️ WARNING:');
    args.push('</div>');
    printToDiv.apply(null, args);
  };

  function printTable(objArr, keys) {

    var numCols = keys.length;
    var len = objArr.length;
    var $table = document.createElement('table');
    $table.style.width = '100%';
    $table.setAttribute('border', '1');
    var $head = document.createElement('thead');
    var $tdata = document.createElement('td');
    $tdata.innerHTML = 'Index';
    $head.appendChild($tdata);

    for (var k = 0; k < numCols; k++) {
      $tdata = document.createElement('td');
      $tdata.innerHTML = keys[k];
      $head.appendChild($tdata);
    }
    $table.appendChild($head);

    for (var i = 0; i < len; i++) {
      var $line = document.createElement('tr');
      $tdata = document.createElement('td');
      $tdata.innerHTML = i;
      $line.appendChild($tdata);

      for (var j = 0; j < numCols; j++) {
        $tdata = document.createElement('td');
        $tdata.innerHTML = objArr[i][keys[j]];
        $line.appendChild($tdata);
      }
      $table.appendChild($line);
    }
    var div = document.getElementById('console-log-text');
    div.appendChild($table);
  }

  console.table = function logTable() {
    table.apply(null, arguments);
    var objArr = arguments[0];
    var keys;

    if (typeof objArr[0] !== 'undefined') {
      keys = Object.keys(objArr[0]);
    }
    printTable(objArr, keys);
  };

  window.addEventListener('error', function (err) {
    printToDiv('<div class="error"> ❌ EXCEPTION:', err.message + '\n  ' + err.filename, err.lineno + ':' + err.colno + '</div>');
  });

}());

var consoleinput = document.getElementById("console-input");
const history = [];
var HistoryIndex = -1;
consoleinput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (consoleinput.value != "") {
      var tmp = consoleinput.value;
      consoleinput.value = "";
      history.push(tmp);
      HistoryIndex = history.length;
      document.getElementById("console-log-text").lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
      eval(tmp);
      document.getElementById("console-log-text").lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
  if (event.key === "ArrowUp") {
    if (HistoryIndex - 1 >= 0) {
      HistoryIndex--;
    }
    consoleinput.value = history[HistoryIndex];

  }
  if (event.key === "ArrowDown") {
    HistoryIndex++;
    if (HistoryIndex > history.length - 1) {
      HistoryIndex = history.length ;
    }
    consoleinput.value = history[HistoryIndex];
    if (HistoryIndex > history.length - 1) {
      consoleinput.value = "";
    }
  }
});