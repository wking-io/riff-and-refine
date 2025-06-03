<?php

namespace App\Http\Controllers;

use Bentonow\BentoLaravel\Facades\Bento;
use Bentonow\BentoLaravel\DataTransferObjects\CreateSubscriberData;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SubscribeController extends Controller
{
    /**
     * Handle the incoming subscription request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);
        $data = new CreateSubscriberData(email: $request->email);
        Bento::createSubscriber($data);

        return back()->with('status', 'Thank you for subscribing!');
    }
}
