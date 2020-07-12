<li id={song.id}>
                        <div className="container">
                          <div className="row my-2">
                            <div className="col-6">{song.song_name}&nbsp;&nbsp;</div>
                            <div className="col-6">
                            <button
                        type="button"
                        id={song.id}
                        onClick={this.onClick}
                        className="btn btn-primary"
                      >
                        add to playlist
                      </button>
                            </div>
                          </div>
                        </div>
                      </li>






<li id={song.id}>
                      {song.song_name}&nbsp;&nbsp;
                      <button
                        type="button"
                        id={song.id}
                        onClick={this.onClick}
                        className="btn btn-primary"
                      >
                        add to playlist
                      </button>
                    </li>