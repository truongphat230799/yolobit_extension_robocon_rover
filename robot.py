import time
from rover import *

def turn_until_line_detected(m1_speed, m2_speed, timeout=5000):
  turn_left = 0
  count = 0
  if m1_speed > m2_speed:
    turn_left = 0
  else:
    turn_left = 1
  
  current_status = 0
  last_status = 0
  
  if turn_left:
    sensor_index = 2
  else:
    sensor_index = 3
    
  last_status = rover.read_line_sensors(sensor_index)
  
  #print('Last status: ', last_status)
  
  rover.set_wheel_speed(m1_speed, m2_speed)
  
  last_time = time.ticks_ms()
  while True:
    if time.ticks_ms() - last_time > timeout:
      rover.stop()
      break
    
    current_status = rover.read_line_sensors(sensor_index)
    #print('Current status: ', current_status)
    if current_status == 1: # meet black line
      if last_status == 1 or time.ticks_ms() - last_time < 500: # still on last black line
        continue
      else: # meet new black line
        if count > 3:
          rover.stop()
          break
        else:
          count = count + 1
    else: # meet white background
      last_status = 0
  
    time.sleep_ms(10)


def follow_backward(speed, timeout = None):
  if rover.read_line_sensors() == (0, 1, 1, 0):
    rover.backward(speed)
  elif rover.read_line_sensors() == (0, 1, 0, 0):
    rover.set_wheel_speed(speed, 0)
    time.sleep_ms(100)
  elif rover.read_line_sensors() == (0, 0, 1, 0):
    rover.set_wheel_speed(0, speed)
    time.sleep_ms(100)
  elif rover.read_line_sensors() == (1, 0, 0, 0):
    rover.set_wheel_speed((-speed), speed)
  elif rover.read_line_sensors() == (0, 0, 0, 1):
    rover.set_wheel_speed(speed, (-speed))
  else:
    rover.backward(speed)
  if timeout != None:
    last_time = time.ticks()
    while True:
      if time.ticks_ms() - last_time > timeout:
        rover.stop()
      break
    

def follow_line(speed):
    if speed > 0:
        follow_forward()
    else:
        follow_backward()


def follow_forward(speed,timeout = None):
    if (rover.read_line_sensors() == (1, 0, 0, 0)) or (rover.read_line_sensors() == (1, 1, 0, 0)):
        rover.turn_left(speed)
    elif (rover.read_line_sensors() == (0, 0, 0, 1)) or (rover.read_line_sensors() == (0, 0, 1, 1)):
        rover.turn_right(speed)
    elif rover.read_line_sensors() == (0, 0, 0, 0):
        rover.backward(speed, 0.1)
    else:
        rover.forward(speed)
    if timeout != None:
      last_time = time.ticks()
      while True:
        if time.ticks_ms() - last_time > timeout:
          rover.stop()
        break
