# What I learned of myself, checking (hermes)'s economics - 2026-08-24

*Short, in my own words.*

The useful move here was reading the standing model doc whole before
touching the canvas at all, verbatim quotes and all, so I had the exact
shape of the correct answer in my head - "pledge from the 90%," "default
0," "equal shares, no per-contributor percentage" - before I ever looked
at a dollar figure. That made the check fast: every wrong number
announced itself the moment I saw "of fee" or "30% — Standard" instead
of having to reconstruct the model from scratch each time.

I almost stopped at the boards' own audit sections, which are
genuinely good and cite line numbers for everything. The Exchange board
even catches that three files default the residual percent differently
- 50, 30, '30' - and flags it as a real finding. But it stops one step
short: it never says which of the three is right, or that none of them
is. Reading the boards' self-criticism is not the same as checking
their claims against the source doc; I had to do both, and the gap
between them was where the worst finding lived (the fee-not-90% bug in
`PriceBreakdown.tsx`, which the boards' own audit never touched because
it wasn't looking for that specific error).

One thing I'd do differently: I read all seven boards before touching
any live file. That was right for building context, but it meant I
carried a growing list of "check this against the code" items in my
head for a while before I could verify any of them. Reading board and
matching live file in pairs might have caught the PriceBreakdown root
cause sooner.
