precision mediump float;
varying vec4 fColor;
varying vec2 fTextEnabled;
varying vec2 fTexCoord;
uniform sampler2D texture;

void
main()
{
	if (fTextEnabled.x > 0.5) {
		gl_FragColor = fColor * texture2D( texture, fTexCoord );
	}else {
		gl_FragColor = fColor;
	}

}