precision mediump float;
attribute vec4 wh_vPosition;
attribute vec4 wh_vColor;
varying vec4  fColor;

void main()
{
    gl_Position = wh_vPosition;
    fColor = wh_vColor;
}