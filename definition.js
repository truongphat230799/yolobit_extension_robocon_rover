const ColorBlock = '#cb2026';
Blockly.Blocks['rover_turn_until_line_detected'] = {
    init: function () {
      this.jsonInit(
        {
          "type": "rover_move_motor",
          "message0": "quay động cơ trái tốc độ %1 động cơ phải %2 (-100 đến 100) cho đến khi gặp đường màu đen",
          "args0": [
            {
              "type": "input_value",
              "name": "left_wheel_speed",
              "check": "Number",
            },
            {
              "type": "input_value",
              "name": "right_wheel_speed",
              "check": "Number",
            }
          ],
          "inputsInline": true,
          "previousStatement": null,
          "nextStatement": null,
          "colour": ColorBlock,
          "tooltip": "",
          "helpUrl": ""
        }
      );
    }
  };
  
  Blockly.Python["rover_turn_until_line_detected"] = function (block) {
    Blockly.Python.definitions_['import_rover'] = 'from rover import *';
    var left_wheel_speed = Blockly.Python.valueToCode(block, 'left_wheel_speed', Blockly.Python.ORDER_ATOMIC);
    var right_wheel_speed = Blockly.Python.valueToCode(block, 'right_wheel_speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = "turn_until_line_detected(" + left_wheel_speed + ", " + right_wheel_speed + ")\n";
    return code;
  };

  Blockly.Blocks['rover_follow_line_until'] = {
    init: function () {
      this.jsonInit(
        {
          "type": "rover_follow_line_until",
          "message0": "dò line tốc độ %1 cho đến khi %2",
          "args0": [
            {
                min: 0,
                type: "input_value",
                check: "Number",
                value: 50,
                name: "speed",             
            },
            {
                "type": "input_value",
                "name": "request",
            }
          ],
          "inputsInline": true,
          "previousStatement": null,
          "nextStatement": null,
          "colour": ColorBlock,
          "tooltip": "",
          "helpUrl": ""
        }
      );
    }
  };
  Blockly.Python['rover_follow_line_until'] = function(block) {
    Blockly.Python.definitions_['import_rover'] = 'from rover import *';
    var request = Blockly.Python.valueToCode(block,  'request', Blockly.Python.ORDER_ATOMIC);
    var speed = Blockly.Python.valueToCode(block, 'speed',Blockly.Pyhton.ORDER_ATOMIC);
    var code = "";
    if speed > 0 :
        code = "follow_forward_line(" + speed + ")\n" + "wait_for(lambda:" + request+")\n" + "rover.stop()\n";
    else :
        code = "follow_backward_line(" + speed + ")\n" + "wait_for(lambda:" + request+")\n" + "rover.stop()\n"

    return code;
  };

  
  Blockly.Blocks['rover_follow_line_delay'] = {
    init: function () {
      this.jsonInit(
        {
          "type": "rover_move_delay",
          "message0": "dò line với tốc độ %1 (0-100) trong %2 giây",
          "args0": [
            
            {
              min: 0,
              type: "input_value",
              check: "Number",
              value: 50,
              name: "speed",
            },
            {
              min: 0,
              type: "input_value",
              check: "Number",
              name: "time",
            }
          ],
          "inputsInline": true,
          "previousStatement": null,
          "nextStatement": null,
          "colour": ColorBlock,
          "tooltip": "",
          "helpUrl": ""
        }
      );
    }
  };
  
  Blockly.Python["rover_follow_line_delay"] = function (block) {
    Blockly.Python.definitions_['import_rover'] = 'from rover import *';
    var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    var time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code =  "follow_forward_delay(" + speed + ", " + time + ")\n";
    return code;
  };

