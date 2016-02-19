import React from "react";
import Sound from "sound";
import {transform, map, each} from "lodash";

export default function soundContainer(soundMap={}) {
  return (Wrapped) => class SoundContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {loaded: false};
      this.sounds = transform(soundMap, (result, path, key) => {
        result[key] = new Sound({path});
      });
    }

    componentDidMount() {
      this.loadSounds()
        .then(
          () => {
            this.setState({loaded: true});
          },
          (error) => {
            console.log(`loadSounds failed: ${error}`);
            this.setState({loaded: true});
          }
        );
    }

    componentWillUnmount() {
      this.unloadSounds();
    }

    loadSounds() {
      const {sounds} = this;
      const errors = [];
      const promises = map(sounds, (sound) =>
        sound.load().catch((error) => {
          console.log(`Failed to load sound "${sound.path}": ${error}`);
        })
      );

      return Promise.all(promises);
    }

    stopSounds() {
      each(this.sounds, (sound) => {
        try {
          sound.stop();
        } catch(error) {
          console.log(`Failed to stop sound "${sound.path}": ${error}`);
        }
      });
    }

    unloadSounds() {
      each(this.sounds, (sound) => {
        try {
          sound.unload();
        } catch(error) {
          console.log(`Failed to unload sound "${sound.path}": ${error}`);
        }
      });
    }

    render() {
      const {sounds} = this;
      const {loaded} = this.state;
      if(loaded) {
        return <Wrapped {...this.props} sounds={sounds} soundContainer={this}/>
      } else {
        return null;
      }
    }
  };
}
