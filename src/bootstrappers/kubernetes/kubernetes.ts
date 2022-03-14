import { createBootstrapper } from "~/utils/bootstrapper.js";

export const kubernetesBootstrapper = createBootstrapper({
	name: 'Kubernetes',
	bootstrap() {
		// todo: install minikube and kubectl and helm
	}
})

export default kubernetesBootstrapper;