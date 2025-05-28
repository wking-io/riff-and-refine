<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Symfony\Component\Process\Process;

class ConvertToWebp extends Command
{
    protected $signature = 'images:convert-to-webp
                            {input : Base name of the PNG file (without extension)}
                            {output? : Optional base name for output files}
                            {--max-width=2400 : Maximum width for the larger image}';

    protected $description = 'Convert a PNG image to WebP at original and half sizes (lossless)';

    public function handle(): int
    {
        $inputFile = $this->argument('input');
        $outputName = $this->argument('output');
        $maxWidth = (int) $this->option('max-width') ?? 2400;

        $inputDir = resource_path('images');
        $inputPath = "$inputDir/$inputFile";

        if (!File::exists($inputPath)) {
            $this->error("File not found: $inputPath");
            return 1;
        }

        // Create full size version (capped at max-width)
        $fullSizeOutput = "$inputDir/{$outputName}@2x.webp";
        $process = new Process([
            'ffmpeg',
            '-i',
            $inputPath,
            '-vf',
            "scale='min({$maxWidth},iw)':-1",
            '-compression_level',
            '6',
            '-lossless',
            '1',
            $fullSizeOutput
        ]);

        $process->run();

        if (!$process->isSuccessful()) {
            $this->error("FFmpeg failed: " . $process->getErrorOutput());
            return 1;
        }

        $this->info("Created: $fullSizeOutput");

        // Create half size version
        $halfSizeOutput = "$inputDir/{$outputName}.webp";
        $process = new Process([
            'ffmpeg',
            '-i',
            $inputPath,
            '-vf',
            'scale=iw/2:-1',
            '-compression_level',
            '6',
            '-lossless',
            '1',
            $halfSizeOutput
        ]);

        $process->run();

        if (!$process->isSuccessful()) {
            $this->error("FFmpeg failed: " . $process->getErrorOutput());
            return 1;
        }

        $this->info("Created: $halfSizeOutput");

        return 0;
    }
}
