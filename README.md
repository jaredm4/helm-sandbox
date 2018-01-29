## Setup

Minikube, Kubernetes-cli and Helm required.

```bash
# Install the things
brew update
brew install kubernetes-cli kubernetes-helm
brew cask install minikube

# Turn on the things
minikube start --vm-driver=hyperkit

# Point your Docker cli to VM  (repeat this for every new shell, or add to your bash profile)
eval $(minikube docker-env)

# Install Helm
helm init
```

## Running

To get started, build the base Docker image.

```bash
docker build -t hellonode:v1 ./build
```

Then deploy. This will echo a randomly generated release name. If you forget the release name, you can find it in `helm list`.

```bash
kubectl create namespace hellonode
helm install charts/hellonode
```

To update to a new version, build a new Docker image with a new tag, update values.yaml to point to it, then:

```bash
helm update release-name charts/hellonode
```

To access via web browser:

```bash
minikube --namespace hellonode service hellonode
```

To remove:

```bash
helm delete release-name
```
