# Typography System V2 Fonts

## Required Font Files

To complete the typography system implementation, you need to download and add these font files to the `/public/fonts/` directory:

### 1. Geist Variable Font
- **File**: `geist-variable.woff2`
- **Source**: https://vercel.com/font/geist
- **License**: SIL Open Font License
- **Usage**: Primary font for body text and smaller headings (H3-H6)
- **Characteristics**: Modern neo-grotesque, excellent legibility, thoughtful expert personality

### 2. Cabinet Grotesk Variable Font  
- **File**: `cabinet-grotesk-variable.woff2`
- **Source**: https://cabinettype.com/cabinet-grotesk/
- **License**: Commercial (requires purchase)
- **Usage**: Display font for hero text and major headings (Hero, H1-H2)
- **Characteristics**: Geometric sans, flexible variable weights, compelling presenter personality

### 3. JetBrains Mono (Already Available)
- **File**: System/Google Fonts fallback
- **Source**: https://www.jetbrains.com/lp/mono/
- **License**: SIL Open Font License  
- **Usage**: Code blocks and technical content
- **Characteristics**: Monospace, highly legible for code

## Font Loading Strategy

The font loading is handled by:
1. **Preconnect**: Establishes connection to font sources
2. **Preload**: Loads critical font files immediately
3. **Font Display Swap**: Shows fallback fonts immediately, swaps when custom fonts load
4. **JavaScript**: Manages font loading states for better UX

## Fallback Strategy

If custom fonts fail to load:
- **Primary Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Display Fallback**: Same as primary for consistency
- **Code Fallback**: Monaco, 'Cascadia Code', Consolas, monospace

## Performance Considerations

- **WOFF2 Format**: Best compression and modern browser support
- **Variable Fonts**: Single file for multiple weights, better performance
- **Font Display Swap**: Prevents invisible text during font load
- **Preload Strategy**: Critical fonts loaded immediately
- **Fallback Fonts**: Ensure content is always readable

## Implementation Status

- ✅ Font loading HTML/CSS implemented
- ✅ JavaScript font loading script added
- ✅ Typography CSS system created
- ✅ Fallback strategy implemented
- ⏳ **Font files need to be downloaded and added**

## Next Steps

1. Download the font files from their respective sources
2. Add `geist-variable.woff2` to `/public/fonts/`
3. Add `cabinet-grotesk-variable.woff2` to `/public/fonts/`
4. Test typography system in the browser
5. Verify fallback fonts work correctly

## Testing

Once fonts are added, test:
- Font loading performance
- Fallback behavior
- WCAG compliance (200% zoom)
- Responsive scaling
- All theme modes compatibility