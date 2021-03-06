// Generated by CoffeeScript 1.4.0
(function() {
  var Base, Keyboard,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./Base').Base;

  Keyboard = (function(_super) {

    __extends(Keyboard, _super);

    function Keyboard() {
      this.on_q = __bind(this.on_q, this);

      this.onInput_action = __bind(this.onInput_action, this);

      this.onInput_text = __bind(this.onInput_text, this);

      this.onInput = __bind(this.onInput, this);

      this.start = __bind(this.start, this);
      return Keyboard.__super__.constructor.apply(this, arguments);
    }

    Keyboard.prototype.start = function() {
      var _ref,
        _this = this;
      this.on('input', this.onInput);
      this.on('setInputMode', function(mode) {
        return _this.mode = mode;
      });
      this.emit('api', 'input.left');
      return _ref = ['action', ''], this.mode = _ref[0], this.textBuffer = _ref[1], _ref;
    };

    Keyboard.prototype.apiSendMap = {
      'LEFT': 'Left',
      'RIGHT': 'Right',
      'UP': 'Up',
      'DOWN': 'Down',
      'NEWLINE': 'Select',
      'ESC': 'Home',
      127: 'Back',
      'm': 'Showosd',
      'o': 'Showcodec',
      'c': 'ContextMenu',
      'i': 'Info'
    };

    Keyboard.prototype.apiExecuteActionMap = {
      'p': 'play',
      'f': 'fullscreen'
    };

    Keyboard.prototype.onInput = function(human, c, i) {
      var fn;
      fn = this["onInput_" + this.mode];
      if (fn != null) {
        return fn(human, c, i);
      } else {
        return this.log("Unknown mode");
      }
    };

    Keyboard.prototype.onInput_text = function(human, c, i) {
      if (human === c) {
        if (i === 127) {
          this.textBuffer = this.textBuffer.slice(0, this.textBuffer.length - 1);
        } else {
          this.textBuffer += c;
        }
        return this.log(this.textBuffer);
      } else {
        if (human === 'NEWLINE') {
          this.emit('sendText', this.textBuffer);
          return this.textBuffer = '';
        } else {
          return this.onInput_action(human, c, i);
        }
      }
    };

    Keyboard.prototype.onInput_action = function(human, c, i) {
      var key, _i, _len, _ref;
      _ref = [human, c, i];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (this.apiSendMap[key] != null) {
          this.log("sending Input." + this.apiSendMap[key] + " (" + key + ")");
          return this.emit('apiSendInput', this.apiSendMap[key]);
        }
        if (this.apiExecuteActionMap[key] != null) {
          this.log("sending Input.ExecuteAction(" + this.apiExecuteActionMap[key] + ") (" + key + ")");
          return this.emit('api.Input.ExecuteAction', this.apiExecuteActionMap[key]);
        }
        if (this["on_" + key] != null) {
          return this["on_" + key]();
        }
      }
      return this.emit('unknownInput', human, c, i);
    };

    Keyboard.prototype.on_q = function() {
      return this.emit('quit');
    };

    return Keyboard;

  })(Base);

  module.exports = {
    Keyboard: Keyboard
  };

}).call(this);
