## Setup

You have two options currently. Minikube (kubernetes-backed development environment) or Docker for Mac Edge (Docker backed development environment that includes single-node Kubernetes).

I currently recommend Docker for Mac Edge because it handles host OS sleep/wakes better.

### Docker for Mac Edge (Recommended)

Install [Docker for Mac (Edge)](https://store.docker.com/editions/community/docker-ce-desktop-mac), and enable Kubernetes following [this guide](https://rominirani.com/tutorial-getting-started-with-kubernetes-with-docker-on-mac-7f58467203fd). If you already have Docker for Mac Stable installed, you'll need to re-install the Edge version, which will replace the Stable one. Optionally setup the Kubernetes Dashboard as described there too.

### Minikube (Deprecated)

Minikube, Kubernetes-cli and Helm required.

```bash
# Install the things
brew update
brew install kubernetes-cli kubernetes-helm
brew cask install minikube

# Start up minikube (uses VirtualBox by default)
minikube start
# Optionally to use hyperkit instead of VirtualBox:
minikube start --vm-driver=hyperkit

# Point your Docker cli to VM  (repeat this for every new shell, or add to your bash profile)
eval $(minikube docker-env)

# Install Helm
helm init
```

## Running

To get started, build the example Docker image. It's a simple NodeJS app running on container port 8080. The name and tag must match what is in values.yaml.

```bash
docker build -t hellonode:v1 ./build
```

Setup a Kubernetes Namespace. In practice, this would be "preprod" or "production". Namespaces should be setup by hand after a cluster is created for an environment. For this sandbox, I used hellonode.

```bash
kubectl create namespace hellonode
```

Now we can deploy or manage the Helm chart.

```bash
# Create Helm Resources and Deploy. Same command to install or upgrade the charts. The release name can be random or pre-defined (like below). The name of the release is used on all the resources.
$ helm --namespace hellonode upgrade --install hellonode charts/hellonode
Release "hellonode" does not exist. Installing it now.
NAME:   hellonode
LAST DEPLOYED: Mon Jun  4 17:05:25 2018
...

# If you forget the release name, you can find it in `helm list`.
$ helm --namespace hellonode list
NAME     	REVISION	UPDATED                 	STATUS  	CHART          	NAMESPACE
hellonode	1       	Mon Jun  4 17:05:25 2018	DEPLOYED	hellonode-0.0.1	hellonode

# To see all the Kubernetes Resources created:
$ kubectl --namespace hellonode get all
NAME               DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deploy/hellonode   1         1         1            1           1m
...

# To access via web browser for MINIKUBE:
$ minikube --namespace hellonode service $(helm --namespace hellonode list -q)-hellonode

# To access via Docker for Mac Edge Kubernetes (the port comes from the service yaml file):
$ open http://localhost:8080
...

# To remove the release. For development, you can use --purge to wipe all remains of the release.
$ helm delete --purge hellonode
release "hellonode" deleted
```
