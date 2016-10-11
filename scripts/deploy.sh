
build () {
  echo ""
  echo "$1"
  echo "=================="
  REACT_APP_PROTOTYPE=$1 npm run build
  surge -p build/ -d "${1}.surge.sh"
}

build autowiki
build wikilater-1
