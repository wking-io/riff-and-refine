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

    private function convertToWebp(string $inputPath, string $outputPath): void
    {
        $process = new Process([
            'cwebp',
            $inputPath,
            '-o',
            $outputPath,
            '-q',
            '100',
        ]);

        $process->run();

        if (!$process->isSuccessful()) {
            throw new \RuntimeException("cwebp failed: " . $process->getErrorOutput());
        }
    }

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
        try {
            $this->convertToWebp($inputPath, $fullSizeOutput);
            $this->info("Created: $fullSizeOutput");
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage());
            return 1;
        }

        // Create half size version
        $halfSizeOutput = "$inputDir/{$outputName}@0.5x.png";
        $process = new Process([
            'ffmpeg',
            '-i',
            $inputPath,
            '-vf',
            'scale=iw/2:-1',
            $halfSizeOutput
        ]);

        $process->run();

        if (!$process->isSuccessful()) {
            $this->error("FFmpeg failed: " . $process->getErrorOutput());
            return 1;
        }

        $halfSizeFinalOutput = "$inputDir/{$outputName}.webp";
        $this->convertToWebp($halfSizeOutput, $halfSizeFinalOutput);

        $this->info("Created: $halfSizeFinalOutput");

        return 0;
    }
}
