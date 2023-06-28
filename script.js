document.addEventListener('DOMContentLoaded', () => {
  const clockElement = document.getElementById('clock');
  const alarmsListElement = document.getElementById('alarms-list');
  const setAlarmButton = document.getElementById('set-alarm-btn');
  
  let alarms = [];
  
  // Update the clock time every second
  setInterval(updateClock, 1000);
  
  // Event listener for the "Set Alarm" button
  setAlarmButton.addEventListener('click', setAlarm);
  
  // Function to update the clock time
  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const timeString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    clockElement.textContent = timeString;
  
    // Check if any alarm matches the current time
    checkAlarms(hours, minutes, seconds);
  }
  
  // Function to format time values with leading zeros
  function formatTime(value) {
    return value.toString().padStart(2, '0');
  }
  
  // Function to set an alarm
  function setAlarm() {
    const alarmHour = document.getElementById('alarm-hour').value;
    const alarmMinute = document.getElementById('alarm-minute').value;
    const alarmSecond = document.getElementById('alarm-second').value;
    const alarmAmPm = document.getElementById('alarm-ampm').value;
  
    const alarmTime = {
      hour: parseInt(alarmHour),
      minute: parseInt(alarmMinute),
      second: parseInt(alarmSecond),
      ampm: alarmAmPm
    };
  
    // Add the alarm to the alarms list
    alarms.push(alarmTime);
    displayAlarms();
  }
  
  // Function to display the alarms list
  function displayAlarms() {
    alarmsListElement.innerHTML = '';
  
    alarms.forEach((alarm, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${formatTime(alarm.hour)}:${formatTime(alarm.minute)}:${formatTime(alarm.second)} ${alarm.ampm}`;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-btn');
      deleteButton.addEventListener('click', () => deleteAlarm(index));
  
      listItem.appendChild(deleteButton);
      alarmsListElement.appendChild(listItem);
    });
  }
  
  // Function to delete an alarm
  function deleteAlarm(index) {
    alarms.splice(index, 1);
    displayAlarms();
  }
  
  // Function to check if any alarm matches the current time
  function checkAlarms(hours, minutes, seconds) {
    alarms.forEach((alarm, index) => {
      if (
        alarm.hour === hours &&
        alarm.minute === minutes &&
        alarm.second === seconds &&
        alarm.ampm === getAmPm(hours)
      ) {
        // Alert the user when the alarm goes off
        alert('Alarm!');
        // Remove the alarm from the list
        deleteAlarm(index);
      }
    });
  }
  
  // Function to get the AM/PM value for the given hour
  function getAmPm(hour) {
    return hour >= 12 ? 'PM' : 'AM';
  }
});