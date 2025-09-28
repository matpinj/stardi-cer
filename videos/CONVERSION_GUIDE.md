# Video Conversion Guide for Web

## The Issue
Your `IMG_2262.MOV` file (17MB) might not play in web browsers because:
1. MOV format has limited browser support
2. Large file size can cause loading issues
3. Some browsers block autoplay for MOV files

## Quick Solution - Convert to MP4

### Option 1: Using VLC Media Player (Free)
1. Download VLC if you don't have it
2. Open VLC → Media → Convert/Save
3. Add your `IMG_2262.MOV` file
4. Click "Convert/Save"
5. Choose Profile: "Video - H.264 + MP3 (MP4)"
6. Save as: `intro.mp4` in the videos folder

### Option 2: Using Online Converter
1. Go to https://cloudconvert.com/mov-to-mp4
2. Upload `IMG_2262.MOV`
3. Convert to MP4
4. Download and save as `intro.mp4`

### Option 3: Using FFmpeg (Command Line)
```bash
ffmpeg -i IMG_2262.MOV -c:v libx264 -c:a aac -crf 23 -preset medium intro.mp4
```

## Recommended Settings for Web
- **Format**: MP4 (H.264)
- **Resolution**: 1280x720 or 1920x1080
- **Duration**: 3-10 seconds ideal
- **File Size**: Under 5MB preferred
- **Frame Rate**: 30fps

## After Conversion
1. Save the converted file as `intro.mp4` in the videos folder
2. The website will automatically use it
3. Remove the debug info from the HTML once working

## Current Status
- ✅ MOV file exists (17MB)
- ⏳ Need MP4 conversion for better compatibility
- ⏳ Consider optimizing file size