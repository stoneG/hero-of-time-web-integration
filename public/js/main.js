const params = (new URL(window.location.href)).searchParams
const type = params.get('type') || 'gpu'

window.document.getElementById('type').innerText = type

function updateTemperature(temperature) {
  window.document.getElementById('temperature').innerText = temperature
}

// https://github.com/NZXTCorp/web-integrations-types/blob/main/v1/index.d.ts
window.nzxt = {
  v1: {
    onMonitoringDataUpdate: (data) => {
        const { cpus, gpus } = data
        updateTemperature((type === 'cpu' ? cpus : gpus)[0].temperature)
    }
  }
}

// Mock NZXT CAM data
let cpuTemp = gpuTemp = 30

setInterval(() => {
  cpuTemp += Math.random() >= 0.5 ? 1 : -1
  gpuTemp += Math.random() >= 0.5 ? 1 : -1

  window.nzxt.v1.onMonitoringDataUpdate({
    cpus: [{temperature: cpuTemp}],
    gpus: [{temperature: gpuTemp}]
  })
}, 1000)