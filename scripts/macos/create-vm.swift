let virtualMachineConfiguration = VZVirtualMachineConfiguration()

virtualMachineConfiguration.platform = createMacPlatformConfiguration(macOSConfiguration: macOSConfiguration)
virtualMachineConfiguration.cpuCount = MacOSVirtualMachineConfigurationHelper.computeCPUCount()
if virtualMachineConfiguration.cpuCount < macOSConfiguration.minimumSupportedCPUCount {
    fatalError("CPUCount is not supported by the macOS configuration.")
}

virtualMachineConfiguration.memorySize = MacOSVirtualMachineConfigurationHelper.computeMemorySize()
if virtualMachineConfiguration.memorySize < macOSConfiguration.minimumSupportedMemorySize {
    fatalError("memorySize is not supported by the macOS configuration.")
}

// Create a 64 GB disk image.
createDiskImage()

virtualMachineConfiguration.bootLoader = MacOSVirtualMachineConfigurationHelper.createBootLoader()
virtualMachineConfiguration.graphicsDevices = [MacOSVirtualMachineConfigurationHelper.createGraphicsDeviceConfiguration()]
virtualMachineConfiguration.storageDevices = [MacOSVirtualMachineConfigurationHelper.createBlockDeviceConfiguration()]
virtualMachineConfiguration.networkDevices = [MacOSVirtualMachineConfigurationHelper.createNetworkDeviceConfiguration()]
virtualMachineConfiguration.pointingDevices = [MacOSVirtualMachineConfigurationHelper.createPointingDeviceConfiguration()]
virtualMachineConfiguration.keyboards = [MacOSVirtualMachineConfigurationHelper.createKeyboardConfiguration()]
virtualMachineConfiguration.audioDevices = [MacOSVirtualMachineConfigurationHelper.createAudioDeviceConfiguration()]

try! virtualMachineConfiguration.validate()

virtualMachine = VZVirtualMachine(configuration: virtualMachineConfiguration)
virtualMachineResponder = MacOSVirtualMachineDelegate()
virtualMachine.delegate = virtualMachineResponder