![alt](docs/img/cm-logo.png)

# [City Match (demo)](https://zenglenn42.github.io/CityMatch/)

Find your city.

# Release 1.0 (MVP)

Basic city ranking and multi-view results work:

![alt](docs/img/cm-mvp-screenshot.png)
![alt](docs/img/view-formats-mvp-bigger.png)

# [Contents](#contents)

- [Value Proposition](#value-proposition)
  - [User Value](#user-value)
  - [Monetary Value](#monetary-value)
  - [**Demo**](https://zenglenn42.github.io/CityMatch/) ☚
- [Designer's Log](#designers-log)
  - [Big Data and the Search for Home](#big-data-and-the-search-for-home)
  - [Thumb Ninja](#thumb-ninja)
  - [**The Design**](#the-design)
  - [Flexy FAB Landing Page](#flexy-fab-landing-page)
  - [Grid-based Preference Page](#grid-based-preference-page)
  - [Not a Horrible CSS Grid](#not-a-horrible-css-grid)
  - [Grid-based Results Page](#grid-based-results-page)
  - [Material Design Lite in the House](#material-design-lite-in-the-house)
  - [MDL-based Preferences Page](#mdl-based-preferences-page)
  - [MDL-based Results Page](#mdl-based-results-page)
  - [On to the Controller](#on-to-the-controller)
  - [Turning the Page](#turning-the-page)
  - [Monetization](#monetization)
  - [Dynamic HTML decorated with MDL classes is a Thing](#dynamic-html-decorated-with-mdl-classes-is-a-thing)
  - [Unpacking MDL Switches](#unpacking-mdl-switches)
  - [Fix IT! The unresponsive hamburger menu](#the-unresponsive-hamburger-menu)
  - [Machine Learning play?](#machine-learning-play)
  - [Shades of Gray](#shades-of-gray)
  - [Clean and DRY](#clean-and-dry)
  - [Wire-up the Backend](#wire-up-the-backend)
  - [Usability Reality Check](#usability-reality-check)
  - [Ignoring Disabled Preferences](#ignoring-disabled-preferences)
  - [Before and After](#before-and-after)
  - [Next Steps](#next-steps)
  - [Sad Face :-/](#sad-face)
  - [UML: Zeigarnik whispers](#uml-zeigarnik-whispers)
  - [So long, jQuery](#so-long-jQuery)
  - [Tab-i-fied Buttons](#tab-i-fied-buttons)
  - [Usability Kindness](#usability-kindness)
  - [List View](#list-view)
  - [Chart View](#chart-view)
  - [Full Stack?](#full-stack)
  - [Map-View](#map-view)
  - [Small Planet](#small-planet)
  - [Agile and the Dalai Lama?](#agile-and-the-dalai-lama)
  - [Slow Day](#slow-day)
  - [User Experience Review](#user-experience-review)
- [Near-term Roadmap](#near-term-roadmap)
  - [Implementation](#implementation)
  - [Usability](#usability)
  - [Harden](#harden)
  - [Tasty Features](#tasty-features)
- [Begin, again](#begin-again)
  - [Menu refactor](#menu-refactor)
  - [A better dropdown-select component](#a-better-dropdown-select-component)
  - [Granular MVC-ification](#granular-mvc-ification)
  - [Translation (t9n)](#translation-t9n)
    - [Easier language selection](#easier-language-selection)
  - [Local Persistence](#local-persistence)
    - [I should remember what language you prefer](#i-should-remember-what-language-you-prefer)
    - [I should remember your latest City-related priority values](#i-should-remember-your-latest-City-related-priority-values)
  - [UI/UX finesse](#ui-ux-finesse)
    - [Harden app if internet goes down](#harden-app-if-internet-goes-down)
    - [Disable the slider for disabled priorities](#disable-the-slider-for-disabled-priorities)
  - [Unknown unknowns](#unknown-unknowns)
    - [Proliferating click handlers](#proliferating-click-handlers)
    - [Managed event handlers](#managed-event-handlers)
  - [Harden & Refactor](#harden-refactor)
    - [Unwelcome Recursion](#unwelcome-recursion)
    - [T9n Refactor](#t9n-refactor)
    - [I ♥️  git bisect](#i-git-bisect)
  - [Table View](#table-view)
    - [Your table is ready](#your-table-is-ready)
    - [But the table is small and by the kitchen](#but-the-table-is-small-and-by-the-kitchen)
    - [I prefer a larger table near a window](#i-prefer-a-larger-table-near-a-window)
    - [Lessons learned](#lessons-learned)
- [Declaring Victory](#declaring-victory)
  - [Thanks for reading](#thanks-for-reading)

-----

# [Value Proposition](#contents)

## [User Value](#contents)

Big-data can expand our awareness and help us find that viable place where we'll feel most enabled and at home given our resources.

## [Monetary Value](#contents)

Co-branding and demographic-driven advertising opportunities exist that would appeal to property management, real estate, and moving companies. Major regional employers and educational institutions could also find value in serving advertisements to prospective job-seekers and aspirational students looking to locate to an area.

# [Designer's Log](#contents)

![alt](docs/img/venue.jpg)
Photo by Suvan Chowdhury

The venue is busy. It's Saturday night which means the music could be rock, soul funk, tribute or a mix. Tonight, it's rock.

It's a varied demographic, mostly middle aged married couples getting their groove on with a mix of younger folk watching and enjoying the sunset.

And then he appears.

Early 30's, jean jacket, glasses, long hair, and a red bandana. He calibrates with the band, offering up some fist pumps to the seasoned rockers on stage.

![alt](docs/img/fist-pump.png)

Later, he approaches the stage and holds his Bic lighter up high in appreciation.

I'm not sure what the band thinks of all this singular devotion. I'm guessing a rush of tipsy cougars would be more their speed, but the point is, this guy has found his tribe and feels he belongs. And isn't that the bottom line?

## [Big Data and the Search for Home](#contents)

Sure, there are instrinsic qualities that allow us to feel comfortable in a variety of environments. But the external world still matters vitally. Scale, economics, culture, community all affect how we relate to and feel about a place. So in a world of options, can big-data expand our awareness and help us find that viable place where we'll feel most at home given our resources?

[City Rank](https://github.com/zenglenn42/CityRank/blob/master/README.md), a 2-week software bootcamp project, explored that idea a bit. However there's only so much that can be done in such a short time.

City Match is an effort to realize the promise of City Rank by improving the user experience with thoughtful front-end design, hardening the code for better performance, and implementing some desired features.

## [Thumb Ninja](#contents)

My focus shifts from the stage to a nearby table where a woman whips out her phone and fluidly navigates through texts and images, powered by the grace of her thumb.

`Tap, tap, swish, scroll. Tap, tap, swish.`

There's an ease and comfort here that seem very natural. I want City Match to be that easy to navigate.

![alt](docs/img/thumb-ninja.png)

![alt](docs/img/thumb-usability.png)

## [The Design](#contents)

In the morning, I come up with this design:

![alt](docs/img/ui-design.jpg)

Three screens:

- landing page
- preference page
- results page

all thumb-navigable by a floating action button near the footer. The results page also features multiple views on the same data:

- list view
- image view
- chart view
- map view

On desktop, I could see offering more than one view at a time. But right now, I'm thinking about mobile mostly. That's the plan.

Even though playing with [Material Design components](https://getmdl.io/components/index.html) is a major goal of this UI redesign, I still want to make sure I understand some of the underlying layout tools offered by modern CSS (especially since MDL builds atop some of those tools).

## [Flexy FAB Landing Page](#contents)

Here's my first cut at a pure CSS floating action button centered about the footer edge. This is done with flexbox (to flex the main section and yield a sticky footer), absolute positioning, and a sweet little calc expression to horizontally center the fab at (50% - 1/2 button width). With some SASS variables, I could make this more [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

I'll probably employ a media query to limit the max-size of the button on larger viewports, otherwise I get a truncated button. Not horrible, but also not great.

![alt](docs/img/flex-landing.png)

## [Grid-based Preference Page](#contents)

I'll employ some kind of responsive grid layout for the preference slider cards.

My first effort illustrates how grid geometries can easily spill over the available space:

![alt](docs/img/grid-play-1.png)

I discover flex-ratio (fr) units and my grid-cells nicely fit to the viewport, preserving ratios:

![alt](docs/img/grid-play-2.png)

But with the preference cards that host the sliders, I want something that collapses down to fit at least 1 card width on mobile platforms. I'm thinking auto-fit might be the key. Exploring that next.

## [Not a Horrible CSS Grid](#contents)

After much point, click, and cursing, I have a responsive grid. It also scrolls nicely within its own div so the footer and fab button below that div always stay visible even with a lot of content.

![alt](docs/img/grid-prefs.png)

Ruefully, I notice my slider cards often don't fall within thumb range with the current positioning. :-/ But I've burned my layout energy for the day and I'm ready to relax. CSS is an interesting goddess. She enables much, but you have to prove yourself worthy.

![alt](docs/img/kali.jpg)
[Image](https://flic.kr/p/xWDRiU) courtesy Debansu Saha (by NC-SA-2.0 license).

Oh, btw, I've add some fu to get my fab button to shrink and grow in proportion to the viewport, but with size limiters at both extremes to keep things from getting ridiculous on retina or large displays or smaller devices. City Match on iWatch some day?

## [Grid-based Results Page](#contents)

This is a wholesale grab of the preferences page for the content area, but I tuck a nifty flex row below it for buttons that will control the view on our results data. The buttons will morph to icons in time.

I also subtly tweak the colors to go with my pastel motif. Not sure I'll keep these, but they are more pleasing than what I have above. I basically soften up the header, footer, and fab colors. It's all very Miami. :-)

![alt](docs/img/grid-results.png)

The cool thing on mobile are the data format buttons. They're in the thumb-zone, so we have a nice usability win here.

Within the flex-ified button div, I use the option:

`justify-content: center;`

with a whisper of left/right button margin for accessibility and proximity to the floating action button (fab).

The layout and styling could use some polish. For example, I feel the button bar cries out for a top-bar of some sort to keep the balance. And maybe that space between the button bar and footer is a slightly odd dead-zone. Could I wedge some monetization in there without be annoying? I could see stacking those two bars and having the fab push the middle option buttons to either side. But I feel I'm in the good enough category at the moment and I want to get some Material Design going and to get this thing /wired up/ to the backend.

The other cool thing is I have more than just wireframes here. I have actual code and behavior that is responsive thanks to the super powers for flexbox and grid. So I could easily hand this off to an awesome designer for them to riff-on and evolve so it's inviting and chock full of [affordance](https://sites.google.com/site/thedesignofeverydaythings/home/affordances).

![alt](docs/img/nyc1.jpg)
Photo by Reynaldo Brigantty (#brigworkz)

## [Material Design Lite in the House](#contents)

Here's my first pass at an MDL-based landing page on mobile.

![alt](docs/img/mdl-landing.png)

I may switch out the picture for something sunnier, but there are several things I like about the image:

- It's charming!

  - The star filter on the street lights and framing of the crescent moon are almost whimsical.
  - The time-lapse river of orange and yellow is lovely and vibrant.

- The image is not identifiable with any /specific/ city.

  - I want something suggestive that doesn't show bias for a particular city in the landing.
  - That, or have a montage kind of thing of several cities. Possibly a tasteful carousel if it's not too busy.

- [Image](https://www.pinterest.com/pin/742179213570198708/) is courtesy [imageocra](https://www.pinterest.com/imageorca/)

MDL has opinions about stuff ... like color. I'm trying to avoid a bunch of custom colors and simply rely upon defaults like 'primary' for nav bar and fab.

![alt](docs/img/mdl-color-wheel.png)

Do you notice the footer, by default, is not solid black? Looks like my instinct to lighten my pure CSS footer above aligns with MDL's default sensibilities.

![alt](docs/img/golden-dawn.jpg)
Image courtesy Beto Franklin.

I wake up this morning with a solution for the results page 'dead-zone' under the view buttons. Just stick to my original design on mobile of morphing the footer into a bottom-app bar and let the buttons live in the sticky footer area. Much more pattern-ful, I think. On desktop, I could see having a dedicated results area that floats above the footer and /contains/ the button bar giving better locality of task for larger displays. I'll try to make that happen with some media queries.

The 'list', 'image', 'chart', and 'map' buttons become icons adjacent to the fab on mobile, eliminating that odd dead-space between the gray button-bar and footer on the left.

![alt](docs/img/view-buttons.png)

For now, I want to get the MDL-based preference page cleaned up and doc'd. I'm really enjoying this design exercise probably because it engages very different parts of my brain than my coding-brain. I'm learning a visual vocabulary and getting better at expressing what's in my mind's eye with CSS.

I notice my repo is starting to get cloned, so others must be interested in my exploration as well. (-;

## [MDL-based Preferences Page](#contents)

MDL has a clean look and I'm trying not to clutter it up with background images behind my cards.

Here's the preference 'slider' page. The switches at the bottom of the cards enable & disable preferences users don't care about.

![alt](docs/img/mdl-prefs.png)

I'll probably add a 'guidance' card at the top that simply invites users to select their preferences. This will provide context and enhance usability by pushing the other sliders closer to the thumb region.

Notice on mobile how the preference card subtly disappears /before/ it hits the floating action button? I think it looks better than tucking behind the button and footer and reduces chance of fat-finger hits between slider and fab button.

Maybe with offscreen preferences (especially on mobile), the 'next' button will remain gray and inactive (or even hidden) until the user scrolls all the way to the bottom of the content just so they don't miss any options before triggering the results pages. If the user disables all the preference cards, the 'next' button should be hidden since there is no sense in proceeding to a results page without ranking criteria.

💡It would be easy enough to add a filter for limiting the search to specific states:

![alt](docs/img/select-states.png)

With the scrollable preference window, the app scales to an endless array of selectable options. For minimal viable product (MVP), I'll stick to the 4 preferences I have above. Once the VC clears, all sorts of scalability plays can happen. (-;

## [MDL-based Results Page](#contents)

![alt](docs/img/mdl-results.png)

I mock up some results cards and implement the view buttons in the bottom app-bar. I may add text for them as well. I'm using a spacer-button with 'visibility: hidden' in the middle to 'push' the other view buttons away from the floating action button.

I also figure out how to customize the primary and secondary colors on the [MDL site](https://getmdl.io/customize/index.html). So I could come up with more of a teal-based look to match the teal tones in the landing page.

![alt](docs/img/mdl-landing-customized.png)

This thing is looking real.

![alt](docs/img/beach-sunset.jpg)

## [On to the Controller](contents)

I need to bring up a controller that listens for button clicks and switches page views. But I'm blocked. My mojo is just not here today. I've been working at this pretty hard for the past week and I need a break. The UI design is in good shape and with fresh eyes, I'm hopeful the controller will emerge in the fullness of time.

## [Turning the Page](#contents)

![alt](docs/img/page-turn.jpg)
Photo by Pixabay

I've come to a decision on my HTML. This is a relatively small app from a front-end perspective and I could just inline all 3 pages worth of HTML and maybe do the whole jQuery _.hide() / _.show() thing for each page-level div.

But there is a /lot/ of repetition in the markup with MDL cards that only differ in a few attributes. Seems a safe bet to either use templates or programmatically generate the content with parameterized helper functions.
In fact, this is essential for scalability of preference options and dynamically generated results.

Though I want to improve my vanilla javascript chops, I think I will lean on my frenemy, jQuery, since he has some ready idioms for enabling event delegation to dynamically created DOM children with buttons and sliders and such. Maybe as a-post MVP exercise, I may redo this in pure js since I know it's good for me.

With that decision out of the way, I can focus on the primitives I'll need to build out the HTML dynamically.

![alt](docs/img/finished-sprint.jpg)
Photo by Tim Gouw

Ok, that was not bad at all. My HTML is [dynamic](https://github.com/zenglenn42/CityMatch/blob/a1c9c0ffeb00ef0bb0e6165ea914a683f56984b5/assets/js/controller.js#L2). That means the body of my html is blissfully uncluttered:

```
  <body>
    <div
      id="body-div"
      class="mdl-layout mdl-js-layout mdl-layout--fixed-header"
    >
      <!-- programmatically add content here -->
    </div>

    <script type="text/javascript">
      controller = new Controller("body-div");
    </script>
  </body>
```

I'm getting an intuitive sense of how libraries like React emerge given aggregation of markup and behavior in the controller now.

Now I need to wire up the buttons.

But before that, a non-linear thought from a previous conversation wells up.

## [Monetization](#contents)

Could this thing generate ad revenue?

I'm thinking about:

- Movers
- Realtors
- Apartment locators
- Job recruiters
- Major employers
- Educational institutions

With some stylistic guidelines, such monetization cards could be blended into the output without looking horrible:

![alt](docs/img/monetize-results.png)

More subtly, the monetization cards could be auctioned off in real-time, calibrated to the demographic data implied by the user's preferences, particularly affordability. Is that evil or brilliant? [Discuss](https://en.wikipedia.org/wiki/Coffee_Talk).

I need to get this thing generating hit metrics if I go down that path.

Beyond that, I fix a few regressions caused by my flurry of coding yesterday in the rush toward dynamic HTML.
I also wire up the fab buttons and deploy to [github-pages](https://zenglenn42.github.io/CityMatch/) so you can at least advance the prototype between landing, preferences, and results pages (though I see my fancy enable checkboxes on pref cards have reverted to simple checkboxes and the hamburger menu only works on the landing page, bah). Overall, it has been a good day.

## [Dynamic HTML decorated with MDL classes is a Thing](#contents)

![alt](docs/img/brick-wall.jpg)
Photo by Tim Mossholder

I'm still dealing with the fallout from generating my HTML on the fly with javascript. Strangely, event delegation to the hamburger menu works for my first dynamically created page, but fails for subsequent pages. In plain English, the menu doesn't do anything when I click on it for the preference and results pages.

The other issue is my spiffy MDL-styled checkboxes are no longer styled. And even more annoying, the active region for the unstyled checkbox extends for the length of the card,
creating all sorts of opportunities for trying to tap the slider but getting the enable /
disable toggle.

So I need to slow down and fix stuff and maybe actually read the docs on [dynamic MDL](https://getmdl.io/started/index.html#dynamic). :-/

### [Unpacking MDL Switches](#contents)

So I want this MDL-styled switch on my preference cards:

![alt](docs/img/mdl-checkbox.png)

but I'm getting /this/:

![alt](docs/img/vanilla-checkbox.png)

And sure enough, if you look at the underlying HTML, you see:

```
<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="switch-civic-happiness">
  <input type="checkbox" id="switch-civic-happiness" class="mdl-switch__input">
</label>
```

whereas on a properly formed MDL switch, you should see:

```
<label
  class="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded"
  for="switch-civic-happiness"
  data-upgraded=",MaterialSwitch,MaterialRipple"
>
  <input type="checkbox" id="switch-civic-happiness" class="mdl-switch__input"/>
  <div class="mdl-switch__track"></div>
  <div class="mdl-switch__thumb">
    <span class="mdl-switch__focus-helper"></span>
  </div>
  <span
    class="mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center"
    data-upgraded=",MaterialRipple"
    ><span class="mdl-ripple"></span></span>
</label>
```

All that missing HTML is normally added behind the scenes by MDL's javascript when the abstract representation of the HTML is loaded into the document object model (DOM).

However, with dynamically generated HTML, I'm downstream of any "document-loaded" event and am missing out on that essential MDL "upgrade" that happens to the stock checkbox HTML.

Fortunately, MDL provides a utility function for this case:

```
componentHandler.upgradeElement(checkbox);
```

The usage pattern is more like this:

```
/* DOM already loaded.  About to create dynamically generated checkbox. */

let checkbox = createCheckbox(id, isChecked);
checkbox.setAttribute("class", "mdl-switch__input");

/* Enhance checkbox with MDL-styling. */
componentHandler.upgradeElement(checkbox);
```

Now my dynamically-generated preference cards feature MDL-styled enable switches like they used to when the HTML was static:

![alt](docs/img/fixed-mdl-switch.png)

As with most things in life, the [actual fix](https://github.com/zenglenn42/CityMatch/commit/fd5a32d5ac4b09d9bb6a3467424ec1041fb8771e#diff-453a0b065c3a1e8636126a44b38d9f55R35) is a little more involved than what has been advertised. He who carries the bag, knows what's inside.

### [Fix IT!](https://tenor.com/view/fix-it-snl-oscar-rogers-weekend-update-kenan-thompson-gif-10667500) 
### [The unresponsive hamburger menu](#contents)

I jump into the chrome debugger and bring up sources and enable mouse-click event listener breakpoints, hoping that will give me a meaty clue in the working case of which method /should/ be firing and leverage that to search the web.

![alt](docs/img/hamburger-events.png)

```
MaterialLayout.prototype.drawerToggleHandler_ = function(evt) {...}
```

Ah, the toggle handler fires on the landing page, but /not/ preferences and results pages.
The gift economy of [stackoverflow](https://stackoverflow.com/questions/35672757/dynamically-adding-mdl-nav-drawer) comes through for me thanks to Krishna Santosh Nidri. I'm rewarded with I nice slideout menu:

![alt](docs/img/slideout-menu.png)

It can be styled later.

With this [fix](https://github.com/zenglenn42/CityMatch/commit/9d0e6c28ac27b1b4ca5e3c412f5bbbe4a96b01e5) in place, serenity is restored and I can think about adding event listeners to other user-interaction elements.

![alt](docs/img/serene.jpg)
Photo by Simon Migaj

## [Machine Learning play?](#contents)

I've watched friends and family play with City Rank and in some cases they're delighted. "Oh, I /do/ like that city!" And in other cases, not so much. "That town is a stretch for me."

Obviously there is complexity in what matters to someone. The current preference sliders (happiness index, political affiliation, affordability) are interesting and help narrow the field, but it would be difficult to anticipate all the inputs that matter. (One mom wanted a city with driveways that were not too steep. :-/)

![alt](docs/img/ml.jpg)
Photo by Pixabay

My question: Is there a way to tap into the collective wisdom (or more darkly, the biases) of the crowd by adding a 'like' button on each city card in the results section, essentially capturing preference data not anticipated by the finite number of input preferences? Out of this set of 10 results, humanity tends to favor /this/ subset ... kinda thing.

Such preference data would certainly help with monetization and ad targeting.

Obviously [ML](https://work.caltech.edu/telecourse) is probably not for MVP, but something in the back of my mind. The 'like' ♥ button, on the other hand, is low hanging fruit.

## [Shades of Gray](#contents)

On the preference page, it would be nice if the image grayed out when the slider switch for that card is disabled. So I make that happen:

![alt](docs/img/grayed-out-prefs.png)

Ultimately, this setting should be conveyed to the model (by the controller) so this particular preference parameter is factored out of the city rank calculation.

Gray is the new gray.

![alt](docs/img/gray-coffee.jpg)
Photo by Pixabay

## [Clean and DRY](#contents)

Man, I need to clean up around here.

I start by standardizing some of my function [naming](https://github.com/zenglenn42/CityMatch/commit/497f3ae3839d1a380e18cd88a08f36dd5dece9ae). The controller code is coming along nicely but a bunch of it is hanging outside the controller object itself. So I [fix](https://github.com/zenglenn42/CityMatch/commit/8a7e1fcb0a9082c38cc85aeac3dde39647094a58) that. I make the [code](https://github.com/zenglenn42/CityMatch/commit/37dd5fdfb057d3450d3d37e6a0a07ca61c7b393b) a bit more DRY by generalizing the callbacks for the 'next' button. I also kill some duplicate [code](https://github.com/zenglenn42/CityMatch/commit/f86ec0e751ad2bb18eacea240a700c71967f8118) for generating the nav bar.

![alt](docs/img/clothes-line.jpg)
Photo by Mali Maeder

I also move the preference on-off switch into the image area to minimize fat-finger interactions between it and the traditional slider. I think it also enhances affordance since the switch is now closer to the image which is subject to grayscaling when the "lights are turned off" and the preference disabled.

![alt](docs/img/light-switch.png)

I'm also now listening to slider change events. And now the controller can serve up preference json to the backend:

![alt](docs/img/controller-works.png)

## [Wire-up the Backend](#contents)

![alt](docs/img/celebrate.jpg)
Photo by ViTalko

After a flurry of [coding](https://github.com/zenglenn42/CityMatch/commit/d5b36711abf409913104c944c7140630607c10b1) and [debugging](https://github.com/zenglenn42/CityMatch/commit/a63ceae5b5822fd28110ec308967a543fac4a84a), the model is now ranking cities for the controller. (-;

![alt](docs/img/celebrate-results.png)

I still need to make model-ranking ignore disabled preferences (and maybe add a modal for requiring at least one specified preference). For now, the model data is simply static and enhanced from City Rank (which was more ajaxy and leveraged firebase to standup a data endpoint).

## [Usability Reality Check](#contents)

Software is hard.

![alt](docs/img/ui-reality-check.jpg)
Photo by Nathan Cowley

Two hours ago, I was flush with exhilaration to see city cards with actual images pop-up in my swank-ified dev environment.

But when I get to mobile and try actually hitting the deployed site, I sense a disturbance in the force. This is /not/ acceptable for someone of my [midi-coderian](https://starwars.fandom.com/wiki/Midi-chlorian) level. Here's what bugs me:

1. The fab button is [too small](https://github.com/zenglenn42/CityMatch/commit/c47c793f1bc206acfb27906d22ca4f026ab79bf4) on mobile.
2. The view-format buttons need to be [spread out more](https://github.com/zenglenn42/CityMatch/commit/c47c793f1bc206acfb27906d22ca4f026ab79bf4).
3. The fab button is too dark. I totally need to get the [teal](https://github.com/zenglenn42/CityMatch/commit/8af03b872a68c2a3d73c838bca398ced27caca65) thing going.
4. The sliders are /hard/ to work with. They are just too [short](https://github.com/zenglenn42/CityMatch/commit/36792ce6e3a64d5290b3b88bbf68c66197fff831) and small on mobile and I get no sense of state change as I move the [thumb element](https://mdbootstrap.com/support/general/making-the-slider-thumb-more-mobile-friendly/) left or right. I mean, I love the sliders, but really. Where is my [CSS light sabre](https://github.com/zenglenn42/CityMatch/commit/803296dc1d646ccd7166eeaa18ae3ce62e7c84e3)?
5. Oh, and I really need to [add back monetization cards](https://github.com/zenglenn42/CityMatch/commit/baf8bae83881559fcee6833fa7d2603189cc392f) in the results.

Ok, feeling much better about the state of things.

![alt](docs/img/waterfall.jpg)

It has been a /very/ good day.

## [Ignoring Disabled Preferences](#contents)

The app is looking more polished so it's getting a lot more testing and visibility from friends and family. One discerning tester understood the intent behind the preference card 'light' switch and tried disabling all the preferences and still got results.

I confess that feature is only implemented on the front-end. With this [commit](https://github.com/zenglenn42/CityMatch/commit/19c5c52aa22024dfd5bc05e366a2d5a77611f40d), I make it work for the backend ranking algorithm too.

Enabling just 'civic happiness' yields Plano, Texas (as expected according to the underlying study used).

![alt](docs/img/pref-subset.png)

For now, if all preferences are disabled, you still advance to the results page, but get a nice message:

![alt](docs/img/pref-none.png)

I may tweak the usability around this, but it's good enough to ship.

## [Before and After](#contents)

Here's a contrasting reveal with the bootstrappy-ui of City Rank:

![alt](docs/img/cr-mvp-screenshot.png)

![alt](docs/img/cm-mvp-screenshot.png)

## [Next Steps](#contents)

![alt](docs/img/beach-steps.jpg)

I think I'm going to take a break from this for a little bit. When I come back, I'll likely work on:

- view formats
  - list, chart, map
- live lists
- [elastic search](https://www.elastic.co/products/elasticsearch)
- menus
- job outlook
- react anyone?

## [Sad Face](#contents) 
## :-/

Huh, it looks like some of the URLs for city images I use are /changing/ from under me:

![alt](docs/img/bummer-img-fname-changed.png)

I manually audit these and [fix](https://github.com/zenglenn42/CityMatch/commit/7faea10d138dafd59c2efc1aec26615c7fa78fe9) several. But this suggests I might need to tuck these away within the app for better reliability. That, or periodically test these URLs as part of a build process.

## [UML: Zeigarnik whispers](#contents)

![alt](docs/img/oo-decomp.jpg)

Something's not quite right with the pattern.  Something's [unfulfilled](https://en.wikipedia.org/wiki/Zeigarnik_effect).

It takes a while to distill it down to something conscious and actionable.
MVC, M.. V.. C.., MV -- wait. I have no V! The view all got sucked out of the html and into my controller, my C, when I made the html-generation dynamic.

Maybe that's the way of things, but it just doesn't sit right with me. I want this to be unmuddled, to clearly see important dependencies and relationships in the code relative to this abstraction I hold in my mind. Besides, my controller module is pretty big. While I'm at it, I'm gonna move that big honkin' piece of static model data into its own object and declutter the model a bit. Maybe sweep up some hardcodes while I'm at it.

So yeah, another round of code refactoring yields this [fix](https://github.com/zenglenn42/CityMatch/commit/a73501315c1438e4eb5ab7012086eec368b502ce).

The controller clearly aggregates the model and view, helping the two to communicate. In some places, I push some callbacks into the view constructor from both the model and controller so the view can come to life and report results nicely. But now, those relationships are clearly spelled out in the constructor, rather than lurking below in a sea of code, waiting to trip-up some poor sustainer who has to maintain or evolve this endeavor.

```
function Controller(bodyDivId) {
  this.model = new Model();

  this.view = new View(
    bodyDivId,
    this.getLandingPageEventListeners().bind(this),
    this.getPreferencesPageEventListeners().bind(this),
    this.getResultsPageEventListeners().bind(this),
    this.getNextButtonEventListener().bind(this),
    this.model.getCityRankCB().bind(this.model),
    this.model.getMinHappinessValue(),
    this.model.getMidHappinessValue(),
    this.model.getMaxHappinessValue(),
    this.model.getMinAffordabilityValue(),
    this.model.getMidAffordabilityValue(),
    this.model.getMaxAffordabilityValue(),
    this.model.getMidPoliticsValue(),
    this.model.githubUrl
  );
  this.view.createLandingBody();
}
```

![alt](docs/img/cm-uml-cd.png)

Sometimes the toughest work you do has no immediate appearance to the outside world.

![alt](docs/img/inner-work.jpg)

## [So long, jQuery](#contents)

![alt](docs/img/jquery-wrench.jpg)

You're very useful, but I'm headed for [React](https://reactjs.org/) and avoiding other libraries that manipulate the DOM should simplify adoption. Here's the [fix](https://github.com/zenglenn42/CityMatch/commit/eb5427c83449a03fc1973792d2e4b2fa7a4ec580) that removes that dependency.

## [Tab-i-fied Buttons](#contents)

MDL provides some nice usability with their components. One day, the buttons at the bottom of the results page will mean something. So I get ready for that by [making](https://github.com/zenglenn42/CityMatch/commit/8270a2fb619be302541a5a38e91e2904e8600ba9) the buttons clickable tabs.

![alt](docs/img/tab-buttons.png)

## [Usability Kindness](#contents)

The little things matter. I had slapped an aspirational 'like' and 'share' button on the results cards, but they were disappearing against darker or busy background images, requiring jedi skills of the user to find.

I fix it with an expedient in-line style (bad, I know, but great for quick riff'ing :).

```
style="background: rgba(255,255,255,.8);"
```

Now we have uniform visibility across result cards, contributing to a subtle but overall feel of comfort:

![alt](docs/img/before-after-mb-styling.png)

You can see I've also opted for the more scalable '3 dots - more' button to meet requirements not yet known without cluttering the card too much.

Also, I [improve](https://github.com/zenglenn42/CityMatch/commit/7066b27290959aa91358a90550eedde1bac366e2) indication of the active view button in the results page with color styling.
On the right, I use the primary color (indigo) and gray for the inactive buttons (since the MDL tab indicator was getting cut off and too subtle for bottom-app-bar applications).

![alt](docs/img/active-view-styling.png)

## [List View](#contents)

I get list view working, since it's relatively low hanging fruit. The data is the same as for chart view, minus the image url. So I just need to throw it into an html list, created dynamically.

![alt](docs/img/list-view-basic.png)

It still needs some tweaking on mobile, but it's good enough to demo.
I'm looking forward to chart and map view, but they will require 3rd party libraries.

## [Chart View](#contents)

I'm on a roll, knocking out a basic grouped stacked bar chart using Chart.js. It has nice animation and is super simple to integrate, thanks to some Array.map fu. I'm not sure how many user's will actually be interested in this view, but quants probably will appreciate. Basically, the ideal city will have a distance of 0 from the user-preference point.

![alt](docs/img/chart-view-basic.png)

I also get a nice metrics pop-up for free:

![alt](docs/img/chart-popup.png)

This just scratches the surface for visualization. A graph like [this](https://bl.ocks.org/mbostock/1062288) might be interesting to explore. Perhaps it could provide another view on how cities relate to each other.

![alt](docs/img/collapsible-force.png)

## [Full Stack?](#contents)

![alt](docs/img/pancakes.jpg)

So is this a full-stack application? No, not really. The model data are produced off-line and provided as a simple [array](https://github.com/zenglenn42/CityMatch/blob/2f307a1f800bd1b547e6dba6e30754cfdd93046b/assets/js/static-model.js#L12) of city metric objects. Other than serving up a [file](https://github.com/zenglenn42/CityMatch/blob/master/assets/js/static-model.js) to the client, the (github-pages) server has little to do.

I don't feel too badly about this since the point here is to explore and evolve the user experience (UX) from City Rank days as opposed to developing a ruggedized data pump to the backend. To that end, I'm adding geo-location data for each city into the static model so I can rollout 'map-view'. Localizing the data endpoint to the client means we'll also get super fast performance after initial data load and can play with features like 'live-list' which should allow me to mutate the ranked list in real-time. It also means I don't have to really think about quota limits against my key if I were to inject it into the normal backend operation of the app. These city locations are not changing anytime soon so this one-shot approach suits my purposes, though adding new cities is a thing.

If you want to see more generalized backend work, checkout the model in [City Rank](https://github.com/zenglenn42/CityRank/blob/master/docs/images/uml-cityrank-cd.png). I play with ajax and firebase there for persisting data.

![alt](docs/img/geolocate.jpg)

I basically make ~200 synchronous calls to Google's geocode endpoint, passing in just the city and state as the address and getting back latitude and longitude.

```
// Code courtesy: https://tinyurl.com/yymbb95e with modifications.

StaticModel.prototype.ajaxGetLocationCoordinate = function(address) {
  var position = {};
  $.ajax({
    url: "https://maps.google.com/maps/api/geocode/json",
    type: "GET",
    data: {
      address: address,
      sensor: false,
      region: "US", // regions string is from:
      // http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
      key: "Your_API_Key_Here"
    },
    async: false,
    success: function(result) {
      // console.log(result);
      try {
        position.lat = result.results[0].geometry.location.lat;
        position.lng = result.results[0].geometry.location.lng;
      } catch (err) {
        position = null;
      }
    }
  });
  return position;
};
```

I wonder if Google will throttle my requests or only return the first n-cities worth of data, but I kick off my utility program and patiently wait a full minute and am finally [rewarded](https://github.com/zenglenn42/CityMatch/commit/2d00b08b00348179a7bfc8a5cd6167009e3705d6) with all the data I need for the model. :-)

## [Map-View](#contents)

![alt](docs/img/map-view.png)

Okay, markers on a map. That's the objective. I have a few options. I could just go with The Google and do some map markers, especially for MVP. I'm also thinking it would be fun to play with [D3](https://d3js.org/) a bit. I start looking around and hit this interesting [thread](https://medium.com/@PepsRyuu/why-i-no-longer-use-d3-js-b8288f306c9a). It places D3 in historical context and advocates, with nuance, for considering other [approaches](https://preactjs.com/) that leverage virtual DOMs and low-impedance syntax of React.

I may still do the D3 thing just because it's prevalent and good for my vocabulary. Is it the jQuery of visualization, though? Not ready to say that.

(⌛time passes ...)

Hah! Went with a basic solution with [leaflet](https://leafletjs.com/).

![alt](docs/img/map-view-basic.png)
![alt](docs/img/map-view-zoom.png)

This could use a lot of polish, but I've got markers on a map. And you can zoom into the street level and don't need to stress over api keys (since it's based upon [open street maps](https://www.openstreetmap.org/#map=3/38.00/-95.80)).

So yeah, all four views work: image, list, chart, map.

![alt](docs/img/view-formats-mvp-bigger.png)

The results code could use some refactor, but I think I'll bump this up to 1.0 MVP.

![alt](docs/img/happy-lights.jpg)

## [Small Planet](#contents)

You know, inclusion of latitude and longitude in the model and the rollout of map view open up some very compelling possibilities.

![alt](docs/img/planet-earth.jpg)

I can see swooping down from a high-level map view to something like Google's street view for a much more immersive sense of a place.

![alt](docs/img/street-view.png)

Subject to [terms of use](https://www.google.com/intl/en-US_US/help/terms_maps/), you could even do a fly-by of a city with [Google Earth](https://www.google.com/earth/). Google exposes an [earth engine API](https://earthengine.google.com/), so this kind of integration seems doable (perhaps with even more sophisticated preferences possible now for extreme weather conditions or fire and flooding). You could organize fly-bys of the top 10 cities /including/ mini fly-bys of the cities themselves. You'd probably want to curate a list of proximate city features and chamber of commerce highlights.

Google has monetized many of their APIs so I'd probably save a feature like this for a fullstack implementation where I have a better shot at protecting the api key, and maybe unlocking that feature for user's who have established an account or otherwise subscribed.

I'm thinking of a business model closer to 'Consumer Reports' and their in-depth auto reports which include valuable pricing information. You get some data for free, but for premium content, you have to pay. With other business models, user's trade some of their data for access. It's interesting be on the other side of the data equation, because I hate being commoditized. At a minimum, the choices for the user should be transparent and clearly rationalized.

But I stumble upon [WebGL Earth](http://examples.webglearth.com/) and maybe they have a sweet [open-sourcey solution](http://www.webglearth.org/) that would allow me to explore this idea without too much api key impedance.

## [Agile and the Dalai Lama?](#contents)

One of the [tenets of agile](https://agilemanifesto.org/) software development is working software over comprehensive documentation. This means you don't isolate yourself in some ivory tower, writing beautiful requirements documents for some ethereal customer and their imagined needs, only to descend with some lovingly crafted but largely irrelevant direction.

Instead, you talk with people. A lot. You involve customers or potential customers early in the process and frequently demo your progress so you can check your trajectory and value against actually expressed needs and requirements.

So I'm doing this with City Match, facilitated by a responsive prototype easy to demo on my cell phone, with subsequent feedback that ranges from politely neutral to strongly enthusiastic.

Until last week.

![alt](docs/img/feedback.jpg)

"This is dumb. I don't like this," she says flatly.

Sometimes you don't hit it off with someone because the solution you're proposing is just not relevant to your beta-tester bystander. I get that. But this person was actually /interested/ in finding a new place to live in the near future. Perfect scenario for me, really.

"Why do I care if someone who lives next to me is happy or not? Why do I care about their politics?", she continues undeterred.

I tamp down an initial pang of vulnerability and laugh. I try to explain she can disable the preference cards that don't apply to her. She plays disinterestedly with the affordability slider and reviews a few cities that seem to past muster at some minimal level. But she is unimpressed.

So I ask, "How /are/ you going about figuring out where to move? What's important to you?"

- Pricing is important.
- Focussing her energy on areas she has already vetted is important.
- Access to Zillo-related property searches is important.
- Proximity to natural beauty is important.

The feedback is interesting, I think. Some of it relates to ideas I've already kicked around. Filtering by region or state makes a lot of sense since people already bring an unspoken collection of 'pre-set' preference sliders to the table and already have a sense of what is desired. Tie-ins to real estate or apartment management portals have been on my radar, etc. To people already focussed on some particular cities, /neighborhoods/ are a big deal. But the bigger point is if I shutdown before I can get the feedback, then I may miss something valuable.

Hmm. Is there a way for 3rd parties to author and publish preference cards? Maybe attack the issue of scale and variability in what users care about that way. If you create a popular platform, maybe others can plug content into it.

Generalizing things a bit, and riff'ing on what I'm learning about React and it's pluggable component-view of the world, I can imagine an endpoint with a variety of downloadable, plugable preference cards that come not only with a componentized view, but with a componentized /model/. Someone has done the hard work of chasing down the endpoints, supplying the keys that make the data flow, and characterizing that data, all verticalized for my City Match-centric universe :D. (I mean CM /is/ the new FB, right? You didn't know.)

A specification could be defined that makes 3rd party originators and publishers of City Match preference add-ons possible. I suppose every app-store wannabe has had fantasies of that kind of scalability. It's where my brain goes and it's fun to dream ... a tailored data-as-a-service thing. I mean, that's what endpoints /are/ and every backend devised is really just quietly doing this every day for their corresponding programs and applications.

But I'm taking the added step of associating that data somehow with a downloadable jsx-ified view component. If you could cultivate a garden of these things, then maybe folks like my discriminating beta tester might find the preference cards that really matter to them rather than me trying to anticipate what will work for everybody.

Where does the Dalai Lama come into all of this?

Last night, while driving home from my fullstack bootcamp, I listen to an [interview](https://www.intelligencesquaredus.org/news/blog/iq2-interview-should-you-love-your-enemies) between John Donvan of Intelligence Squared fame and Arthur Brooks, discussing Brooks' new book, "Love Your Enemies: How Decent People Can Save America from the Culture of Contempt".

Brooks knows and has co-authored books with the Dalai Lama. At one point, Brooks asks his exalted friend, "How should I respond when contempt is directed toward me?" "With a warm heart," is the response. It's a glimmering insight from someone who is no stranger to attack. Brooks then relates, in the interview, some of the physiological benefits that flow to the body and enhance well-being if we can do this in the face of perceived negativity.

![alt](docs/img/garden-heart.jpg)

It's simple advice which runs counter to our normal instinct to be defensive in the face of unexpected or contrary feedback. But if you're going to embrace agile software development, this strategy may be useful if difficult to master.

## [Slow Day](#contents)

I've got some catching up to do in my bootcamp homework, so today is pretty slow, CM-wise.

![alt](docs/img/sebastian-molinares-49289-unsplash.jpg)
Photo by Sebastian Molinares

I fix a bug and refactor a little code in the view. I dream about what I want to knock out next:

- job outlook?
- live list?
- react migration?

![alt](docs/img/christophe-hautier-774462-unsplash.jpg)

## [User Experience Review](#contents)

![alt](docs/img/david-travis-WC6MJ0kRzGw-unsplash.jpg)
Photo by David Travis

I share this app with someone with deep design and UX experience for a brief impression.  Several obvious issues pop out:

- The user needs a sense of where they are in the app at any given time, especially if there is a progression of steps to accomplish a task.  Consider adding bread crumbs to make that apparent.

- The splash screen typeface is a bit undersized for comfortable reading across a broad demographic.

- The language introduced in the splash screen should be carried into subsequent pages (in headers or instructions) at some level to reinforce the expectations you set for your users at the outset.

- Use evocative language that maps to a user's emotional desire as they navigate your app.  Leverage language to cultivate positive affect.

- Be careful about mashing-up a 'heart' icon as part of your app logo in the header since it could be construed as specifying a 'favorite' button.

- Don't be shy about adding tooltips to explain and contextualize your buttons or preferences.

- If you want a means to redirect the user back to the home screen via the header, use a 'home' icon.

- The little enable/disable slider switch on the preference cards should probably be dropped in favor of a plain checkbox since the affordance is not great.  They suggest a slide motion, whereas they only respond to a touch or click.

- Consider adding enable/disable preference option off the settings menu (instead of just relying upon the checkbox on the preference card).  Some users may be more accustomed to this usage pattern.  Giving the user a couple ways to accomplish something can be a good thing.

- The 'Affordability' preference label is inverse to the $ [-------------] $$ slider control.  Typically one would expect less of something when the slider thumb control is to the left and more of it when the thumb control is to the right.  Using a term like 'Cost of Living' may be a better option.

I address most of the feedback in a slew of 30+ fixes.  UI/UX work requires a lot of love to craft something that is appealing and free of impedance.

# [Near-term Roadmap](#contents)

![alt](docs/img/pexels-pixabay-315938.jpg)

My recent UX review is motivating me.  This app is a portfolio piece so it's more of a sketch as opposed to a production-ready offering.  However, the usability feedback has me thinking about several areas that could be improved or enhanced without costing me a ton of bandwidth.

## [Implementation](#contents)

  - Capture application state in a single structure that can be passed around and persisted through local storage.  This should provide a clean mechanism for supporting some of the usability features below and put us in good stead for scalability down the road.

## [Usability](#contents)

  - Flesh-out a non-trivial menu drawer.

    - Allow user to select target page from menu instead of clicking through on the bottom-appbar floating action button (FAB) since some users may be more comfortable with that idiom.

    - Add a settings sub-menu (with gear icon) off of the menu drawer so user can:

      - specify number of cities to report on in results [top 3, top 10, all]

      - enable or disable certain preference cards

  - More responsive features

    - The app is really designed for mobile geometries.  Consequently, the desktop view looks a bit gangly and awkward with a ton of ugly whitespace.  Be more generous with card geometries and even text / labels on desktop.  Consider adding back the 'Get Started' button on big screens, for example.  The lonely FAB on the botton of a 1900x1600 screen looks a bit anti-pattern to me.

    - Allow user to change input priorities on the same screen as the results for 'live-list' sensitivity analysis.  Dedicated screen real estate for supporting this is more apparent on desktop.  (On mobile, a floating preferences FAB could expand to a semi-transparent modal to achieve the same effect.)

## [Harden](#contents)

  - I clearly have a dependency upon javascript and even the internet here (since city images and map navigation need the net, among other things).  There should be a test for these dependencies and either feedback to the user or a gentle degradation in the user experience.

## [Tasty Features](#contents)

  - I love adding multi-language support to my apps.  The string catalog for this app would be relatively small and it would be a nice bit of refinement.

  - City Search ... give the user ability to search for a city they already know about.  If it's known to City Match, the corresponding metrics could be used to seed the preferences and bring that up as the top ranked result along with a bevy of "preferentially close" cities they may not have considered.  If the city doesn't exist, at least pull up the known cities that happen to be in the same state.  Having a meaninful search icon in the nav header could be enticing.

  - I'd like to upgrade from Material Design Lite, which has reached end-of-life, to something more vital like Material Components.

# [Begin, again](#contents)

![alt](docs/img/danielle-macinnes-IuLgi9PWETU-unsplash.jpg)
Photo by Danielle MacInnes

## [Menu refactor](#contents)

What starts out as a modest, hardcoded mock-up ...

![alt](docs/img/slideout-menu.png)

morphs into something which allows menu-based navigation (through the 'View' submenu) and mutation of some application settings.

![alt](docs/img/menu-refactor.png)

I create my own drop-down selection element since Material Design Lite (MDL) doesn't provide one, yet another reason to upgrade to Material Components.  

## [A better dropdown-select component](#contents)

I do a little poking around on github and find a snazzier dropdown [here](https://creativeit.github.io/getmdl-select) that works with MDL.

The [integration](https://github.com/zenglenn42/CityMatch/commit/0de475bd546cb23f894008ce4c291752178c5779) is actually pretty interesting since it forces me to think about how to get my app-level click handler to co-exist with the low-level, 3rd-party click handler for the selection component.  They have an event handler for managing the visual aspects of the control, but **I** have a model and view which need to mutate in response to those changed-value events and I clearly don't want to dump my app code into their handler.

The key is to add my own event handlers off the parent ```<div>```'s that wrapper the ```<input>``` and ```<ul>``` elements used to implement the dropdown and to rely upon event bubbling to ensure my handler fires **after** visual state is mutated by the dropdown's handler so I can then fetch the newly selected value from the control and update my application model state and view accordingly.

But **where** exactly do the tasty new dropdown value settings reside from a DOM perspective?  I see they are using **two** ```<input>``` elements in their implementation, one of which is actually hidden.  What's that about?

So I step through the 3rd party code (and mess with their js map files since their sourceRoot references an ```e:``` drive and I don't roll that way).  I learn the selection values I want to fetch from within my event handler are stored in that hidden input component so that's what I target in my event handler.  Interesting design, btw.  I do wonder if there would have been a way to leverage or decorate the standard `<select>` element for better, more native, behavior on mobile.  I'd prefer the Safari spin-wheel selector to appear on iOS, for example.  However this is way better than what I cobbled together:

![alt](docs/img/better-dropdowns.png)

Also, my dynamically generated DOM elements require a manual invocation of the 3rd-party selection element's ```init()``` method before I'm rewarded with desired behavior.  Otherwise state was only correct upon initial app-load and not so much for subsequent, generated views.

As I write this, I realize I should be responding to 'change' events off the ```<input>``` control and not clicks from the parent ```<div>``` since I should only mutate state on ***changed*** values.  I wrote that code before I entirely understood how to horse-whisper the W3C event capture / bubbling system and probably had this vague notion that event handlers off the same element could get dicey.  My way is at least deterministic though it clearly sacrifices efficiency and probably explains some edge case behavoir I'm seeing with the arrow indicator thinking the dropdown is open when it's actually closed.  Meh, next time. (-; Still a net win to add the nicer control.

## [Granular MVC-ification](#contents)

Nicely oraganized code, sensibly arrayed across a filesystem, can be a feature in its own right.  It makes thinking about and updating the codebase ***so*** much easier.  But the standard quip is MVC stands for "Massive View Controller" and my controller is up past 1000 lines, so it's past time to refactor.  

Currently, I'm partitioning code into three separate files along model, view, and controller boundaries:

* model.js
* view.js
* controller.js

I also have a separate file for code that simulates a data endpoint with city metrics:

* static-model.js

I do a ton of reading about MVC and related patterns such as Model View Presenter (MVP) and Model View View-Model (MVVM).  I'm also curious about how the notion of persistence (both local and server-side) relates to the discussion of how to organize my code sensibly across my dev filesystem.  

The other wrinkle is I'm currently geared for a thick client.  How will code organization morph in a fullstack context? I have this sense that parts of my model and controller will eventually cleave across the client / server boundary and want a file structure that facilitates that evolution.

As usual, there's a lot of noise and [differing opinion](https://softwareengineering.stackexchange.com/questions/134820/in-an-mvc-system-where-should-the-database-persistence-code-sit) out there, but the following folks guide me out of the fog:

* [GUI Architectures](https://martinfowler.com/eaaDev/uiArchs.html) by Martin Fowler 
* [Understanding MVVM - A Guide for JavaScript Developers](https://addyosmani.com/blog/understanding-mvvm-a-guide-for-javascript-developers/) by Addy Osmani
* [The Model-View-Controller Architecture](https://drstearns.github.io/tutorials/mvc/) by Dave Stearns

I start by creating view-models for the screens and menu:

* models/model-menu.js
* models/model-settings.js
* models/model-landing.js
* models/model-priorities.js
* models/model-results.js

These manage frontend state instance variables through getters and setters.  I also aggregate my model-specific translation messages catalogs here.  The catalogs are simple javascript maps, keyed by locale (e.g., 'en-US'), with translated strings as value.

My domain model (stuff that will likely go on the backend some day) still gets grouped with the view-models:

* models/model-cities.js
* models/model-static-cities.js

I partition the controller along similar file boundaries.  These files define event handlers that set model state in response to user activity.  This really is where calls to model setters (for mutating state) happens:

* controller/controller.js
* controller/controller-menu.js
* controller/controller-settings.js
* controller/controller-landing.js
* controller/controller-priorities.js
* controller/controller-results.js

The view gets similar treatment:

* view/view.js
* view/view-menu.js
* view/view-landing.js
* view/view-priorities.js
* view/view-results.js
* view/view-settings.js

The methods herein read state from the view-models and render the view accordingly.

Eventually, I segregate newly written persistence code into its own area since storage is somewhat orthogonal to classic MVC as I understand it:

* storage/local-storage.js

I really ***should*** leverage client-side modules given all the work that has gone into making that possible over the past few years.  I'd like the attendant namespace'ing and data-hiding goodness.  I've been reading Addy Osmani's book, ```Learning JavaScript Design Patterns,``` and Matt Frisbie's ```Professional JavaScript for Web Developers.```  So I know there is a ***lot*** of stuff I should be doing to craft exemplary designs and code.

But a more granular file structure is an incremental and relatively easy win for now.  I know immediately where I have to go when something relates to state, versus presentation, or event handling.

## [Translation (t9n)](#contents)

![alt](docs/img/t9n-settings.png)

The MVC and view-model work facilitate multi-language support.  Since all the strings you see on the screen are now pulled from the view model, it's relatively easy to organize these by locale:

```
assets/js/models/models-landing.js

  this.msgCatalog = {
    "en-US": {
      appName: "City Match",
      slogan: "Find your city",
      blurb: "Thinking about a move but not sure which city is your best bet?\n" +
             "Share your priorities and we'll offer some options to consider.",
      copyrightDate: "2021"
    },
    "es-ES": {
      appName: "Ciudad de Sueños",
      slogan: "Encuentra tu ciudad",
      blurb: "¿Estás pensando en mudarte pero no estás seguro de cuál es tu mejor opción?\n" +
             "Comparta sus prioridades y le ofreceremos algunas opciones a considerar.",
      copyrightDate: "2021"
    },
    ...
```

All that's needed is a string getter that pulls locale from the Settings model and then
retrieves the corresponding string for that locale:

```
assets/js/models/models-landing.js

ModelLanding.prototype.getAppName = function() {
  return this.msgCatalog[this.getLocale()].appName
}
```

The view then simply calls ```landingModel.getAppName()``` to fetch the application name translated into the language of the current locale:

```
assets/js/view/view-landing.js

View.prototype.createLandingBody = function() {
  let bodyDiv = document.getElementById(this.bodyDivId)
  bodyDiv.innerHTML = ""

  let appName = this.getAppName()
  let header = this.createHeader(appName)
  ...
}

View.prototype.createHeader = function(title, rightNavIcon) {
  let h = document.createElement("header")
  h.classList += "mdl-layout__header"
  h.innerHTML = `
      <div class="mdl-layout__header-row">
      <div class="mdl-layout-spacer mdl-layout__header-left-spacer">&nbsp;</div>
      <span class="mdl-layout-title mdl-layout-title-nudged">${title}</span>
      ...
  `
  ...
}
```

With a conducive pattern in place, I add translations for 4 of the world's most common languages, though I still need to run the translations by some native speakers since I likely made some funny choices, despite google translate's general prowess.

![alt](docs/img/t9n-landing.png)

### [Easier language selection](#contents)

I enlist a friend to review one of my _probably-sketchy_ translations but he comments that he doesn't see **where** to change the language/locale.  It's a moment of miopic-comeuppance for me since I feel like I've been very patternful in creating a menu drawer with a Settings tab (complete with conventional 'gear' icon) ... and then, um,  an 'Edit' item to bring up the page where the language can _actually_ be changed. :-(

Hmm.  I see his point.  He's got to click down through 4 layers to do that.  Most folks wouldn't even /know/ you had taken the trouble to localize your app with all that indirection.  So I decide to add a tasty language-dropdown on the main nav itself:

![alt](docs/img/t9n-nav.png)

I probably should detect/discover locale from the browser environment and set that intelligently if it happens to match one of my supported locales, defaulting to English otherwise.


## [Local Persistence](#contents)

![alt](docs/img/art-wall-kittenprint-9Wq1HpghQ4A-unsplash.jpg)
Photo by Art Wall - Kittenprint

### [I should remember what language you prefer](#contents)

The translation work is more satisfying if changes to the locale (and any other setting, really) are remembered across CityMatch sessions.  So I add a [commit](https://github.com/zenglenn42/CityMatch/commit/f4e7800da7d16171ecc0c6740eb449ec62ab9279) to persist settings state to local storage whenever that state changes.

At application start-up, the controller detects for valid, locally cached settings and updates runtime state accordingly:

```
function Controller(bodyDivId, locale = "en-US") {
  this.cache = new LocalStorage()

  // Instantiate domain model.

  this.cities = new ModelCities()

  // Instantiate view models.

  this.settings = new ModelSettings(locale, this.cities.getNumCities())
  if (this.cache.hasSettings()) {
    // Update current settings state from cached settings.

    let persistedSettings = this.cache.getSettings()
>>  this.settings.set(persistedSettings)
  }
  ...
}

```
Of course, saving settings implies the need to clear settings, so I add a menu button for doing that:

![alt](docs/img/clear-cache.png)

Once you clear the cache, the button presents as disabled since there is nothing to clear.

### [I should remember your latest City-related priority values](#contents)

The same ethos of app settings persistence holds for user priorities as well.  At some point, I could see offering a feature to save your various searches over time, but for now I want to at least capture the last set of slider-card values you specified.

With this [commit](https://github.com/zenglenn42/CityMatch/commit/386fb155f90e5423ef73fcab51659185e99c0c19) and this [bug fix](https://github.com/zenglenn42/CityMatch/commit/f1d1e13321b642ec312f0a63c4051a054ec88bd1) I now persist user priority settings to local storage and restore those at the next invocation of the app.  I also reflect current priority values in the menu itself:

![alt](docs/img/persistent-priorities.png)

## [UI/UX finesse](#contents)

### [Harden app if internet goes down](#contents)

It's a complicated world and sometimes the precious internet is not available.  

How should the app respond?  Naively?  Haphazardly?  Gracefully?

In an ideal world, this would be a progressive web-app with service workers and the ability to work offline.  But I'm not really there yet.

But I can at least make things **incrementally** better if the net happens to go down after the app has loaded.  This is a thick-client app and we really should be able to get by better on browser-cached content.

But the city images are pulled in real-time from wikepedia and without the net, you get:

![alt](docs/img/inet-unaware.png)

And clicking on the map-view without the net often brings up a partially rendered, blocky canvas of fail.  Trying to zoom in or zoom out is also a bad idea at this stage, unleashing an avalanche of angry load-errors in the dev console.

So I add some [logic](https://github.com/zenglenn42/CityMatch/commit/c9e985c637bb2a088ec85805315d692ef817c447) for detecting online status at controller-instantiation time and backfill the missing images with our default landing page image:

![alt](docs/img/inet-resilient.png)

You'll also notice the map button on the bottom app-bar gets disabled and some tooltip text gives you a clue as to why.  Once the net is back and the user reloads, the images are fetched and the map button is re-enabled.  The next refinement would be to [periodically poll](https://gist.github.com/gitdagray/f310be81be217750fc9d2b233e2ae70c#gistcomment-3819167) network status and have the view observe and respond to any state changes accordingly.

Implementing this in a clean way requires an understanding of the difference between event capture versus event bubbling.  Peter-Paul Koch writes about this on his [blog](https://www.quirksmode.org/js/events_order.html#link4).  Here's [another resource](https://javascript.info/bubbling-and-capturing) that nicely depicts the capture, target, and bubbling phases of event processing.

Without this fu, I notice the user may still click on the disabled button and the focus indicator, controlled by the low-level MDL tab components's event handler, visually shifts to what should be unselectable!

The trick is to [enable capture](https://github.com/zenglenn42/CityMatch/blob/21d8093eb442e337ba021a875ffc31281f08520a/assets/js/controller/controller-results.js#L36) in my parent element event handler (so it fires /before/ the MDL tab handler) and then [stop event propagation](https://github.com/zenglenn42/CityMatch/blob/21d8093eb442e337ba021a875ffc31281f08520a/assets/js/controller/controller-results.js#L67) for that particular click in the absence of internet so the downstream tab component handler never sees the click.

### [Disable the slider for disabled priorities](#contents)

Users have the ability to completely disable any of the input priorities they don't like.  Maybe they don't care about politics or money is no object.  They simply click-off a switch in the upper right portion of the priority card and the associated image thoughtfully grays out; that attribute no longer affects the ranking calculation.

However, my UI/UX person noticed the ***slider*** could still acquire focus and be mutated.

![alt](docs/img/disabled-priority.png)

So ***now*** I turn off the lights, [freeze](https://github.com/zenglenn42/CityMatch/commit/574d0c5540a293c05da35ddda9d56da5b8a85c72) the slider, and [gray-out/strike-through](https://github.com/zenglenn42/CityMatch/commit/62afe887218512439dd25beaaca9e3019388f9a1) the corresponding menu item to more completely reflect disabled status.

The other subtlety I address is ***disallowing*** selection and hover styling for the read-only priority values within the menu drawer.  Otherwise they behave like clickable things but aren't.  All these little details add up to a less confusing, more refined experience for the user.  

## [Unknown unknowns](#contents)

You don't know what you don't know.  

But I guess there's a certain wisdom in knowing that.  It leaves room for learning, it battles the impulse toward arrogance, and it enables a dose of humility ... all of which makes you easier to tolerate amongst your fellow striving humans.

But sometimes I forget and start to feel sassy about my steadily evolving code children.  They really are above average and should go to Harvard one day.

Then this happens ...

![alt](docs/img/bad-clicks.png)

You know how you wire up a new event listener and you throw this in there ...

```
console.log('click')
```

just so you can get feedback that it's actually firing when you click the mouse? ...that the miracle of leptons and quarks, coalescing into atoms, repurposed into enlightened silicon, now animating your sketchy code across countless layers of abstraction is actually working-ish?

Well, I do that too, but the problem here is that it's working ***too*** well.

I only click the mouse once but ***my click handler appears to be firing 8 times***!  Or maybe I somehow have 8 ***copies*** of the same click handler responding to the same event?

And the story gets worse as I mouse and click around the app.  The click count jumps by ever-increasing multiples.  On mobile, the app eventually grinds to a halt.

### [Proliferating click handlers](#contents)

I ***think*** I have one special robot child click handler, but I've actually created a proliferating factory of them.

![alt](docs/img/legion-listeners.png)

I do the deep dive and learn about care and handling of click handlers and eventually come across this nugget:

![alt](docs/img/sage-advice.png)

But that's essentially what I'm doing when I use the FAB's click handler, for example, to advance to a new page by tearing down what's currently anchored off of the body ```<div>``` and dynamically building a new view of DOM nodes ***including*** new event listeners.

Obviously the runtime is not garbage collecting the old event handlers in the way I naively expect.  Simplistically nulling out the innerHTML of the body ```<div>``` is bad form since it doesn't clear out event handlers.  But even writing my own code to remove child nodes recursively doesn't get me out of hot water.

I ***could*** spend a bunch of time scooping up all my dynamically added event listeners and add those before building out views below the body ```<div>```.  I may end up doing that if that's the best practice.  However I do figure out a way to extend the code for attaching event handlers to dynamically created nodes to only register an event handler ***once***.  And that instantly stops the insanity.

### [Managed event handlers](#contents)

I'm pretty happy with this code because it also gives me a chance to play with the singleton pattern:

```
//
// Prevents duplicate listeners from being added to dynamically created
// DOM elements.  We need this in the absence of jQuery's $.on() method.
//
// Inspired by: 
// Learning Javascript Design Patterns by Addy Osmani
// https://stackoverflow.com/questions/30880757/javascript-equivalent-to-on
// https://www.jimmycuadra.com/posts/keeping-track-of-javascript-event-handlers
//
// TODO: Is there a more canonical way to do this in 2021? :-) 

Controller.prototype.ManagedEventHandlers = (function() {
  var _singleton

  function createInstance() {
    let _registered = {}  // private key-value store for registered event handlers

    return {
      isAlreadyAdded: function(evt, sel) {
        let key = `${evt}_${sel}`
        return _registered.hasOwnProperty(key)
      },  

      track: function(evt, sel, handler) {
        let key = `${evt}_${sel}`
        if (!this.isAlreadyAdded(key)) {
          _registered[key] = []
          _registered[key].push(handler)
        }   
      },  

      // Add event handlers for dynamically created elements.
      // See: https://stackoverflow.com/questions/30880757/javascript-equivalent-to-on

      addEventListener: function(el, evt, sel, handler) {

        // Track requests for adding delegated event handlers to
        // dynamically-created DOM elements so we can avoid adding duplicates.
        //  
        // Otherwise, the view code as written may register duplicate handlers
        // and we'll see performance steadily degrade as the DOM runs the same
        // event through all of them. :-| 

        let alreadyAdded = this.isAlreadyAdded(evt, sel)

        if (!alreadyAdded) {
          this.track(evt, sel, handler)
          el.addEventListener(evt, function(event) {
            let t = event.target
            while (t && t !== this) {
              if (t.matches(sel)) {
                handler.call(t, event)
              }   
              t = t.parentNode
            }   
          })  
        }   
      }   
    }   
  }
  return {
    getSingleton: function() {
      if (!_singleton) {
        _singleton = createInstance()
      }
      return _singleton
    }
  }
})()
```

now I can blithely add delegated event listeners [anywhere in my code](https://github.com/zenglenn42/CityMatch/blob/efbda0d7a5e9fee46eb1259a4dc39db72372e325/assets/js/controller/controller-landing.js#L17) knowing that only the first instance of these will actually get registered with the DOM and I'll go back to having just one special robot child again.

The other thing I learn is that Safari, as a dev environment, frequently needs to be restarted when debugging event handler code.  Same with dropping the cache.  I click the tasty 'Empty Caches' item off the Developer submenu, but sometimes the old context / code is still lurking around.

I'll find a more exemplary way to manage event handlers, but I'm out of the ditch for now.

## [Harden & Refactor](#contents)

### [Unwelcome Recursion](#contents)

Modern browser debuggers are truly amazing.  I increasingly hang-out there to single-step through code or understand what CSS god I have displeased.  I love the z-indexed stacked ```Layers``` view and know how to breakpoint the event listeners that hang off a particular DOM node.  But simple element inspection may also reveal obvious problems.  Case in point:

![alt](docs/img/bad-recursion.png)

Hmmm.  As I click-through to various pages from the FAB, clearing nodes and recreating new DOM heirarchies off the top-most body ```<div>```, I see unexpected insertions of ```mdl-layout__container``` ```<div>```'s.  Clearly this is a bug.  This particular ```<div>``` is not something I explicity add, but rather something introduced by the MDL framework itself, probably in response to the plethora of calls to componentHandler.downgradeElements()/componentHandler.upgradeDom() that stackoverflow served up to resolve my unresponsive hamburger menu issue back in the day.  Frameworks give you the ability to add a class to an element and then magically generate the tedius DOM nodes to realize the promised abstraction.  But sometimes the abstraction breaks down.

In all likelihood, I'm abusing MDL in some way.  But my motivation to understand an end-of-life framework is minimal.  I'm getting closer to a refactor that increases the lifetime of my page-DOM hierarchies so I don't wantonly recreate components from scratch with every click of the FAB.  But I'm not quite ready for the whole React/Material Components migration.  So I opt to get really OCD between page renders with the following code that strips the body component back to the studs before building up the next page:

```
View.prototype.resetBody = function() {
  this.removeChildNodes(document.body)

  let bodyDiv = document.createElement("div")
  bodyDiv.setAttribute("id", `${this.bodyDivId}`)
  bodyDiv.setAttribute("class", "body__div mdl-layout mdl-js-layout")

  document.body.appendChild(bodyDiv)
  bodyDiv.innerHTML = ""
}
```

I sprinkle this around liberally and the parasitic recursion stops.  Until I get to some performance-minded refactoring and obviate the need to rebuild stuff from scratch with each page change, this will suffice.

### [T9n Refactor](#contents)

Anytime you can refactor 2000 lines of code down to under 1000 with no loss of functionality and arguably better maintainability, it's a good day.  Less code to maintain, less code to send down the wire.

![alt](docs/img/t9n-refactor.png)

Of course, it probably reflects some wisdom gained over the first attempt, to put it gently.

After seeing the formal parameter list for my View object grow to over 100 items, I notice a
good 70 of those things are simply string getters which fetch a static string out of a message catalog based upon the current language/locale and render on the screen with the following usage pattern:

```
  let title = this.getAppName() // Returns 'City Match' when locale is en-US.
```

With this [commit](https://github.com/zenglenn42/CityMatch/commit/724a502ad2b7fec4e061732e13b583cd0cda604c), the pattern becomes:

```
  let title = this.t('AppName') // Return translated string associated with 'AppName'.
```

This allows me to replace all the ```getAppName(), getAppSlogan(), ... getBlah()``` methods,
sprinkled about various view-models, with a single _translation_ method, [```ModelT9n.t()```](https://github.com/zenglenn42/CityMatch/blob/a267233c03f8806bf568df5fc7112609899f3065/assets/js/models/model-t9n.js#L577).

Knowledge of the current locale is established by a getter from the Settings view-model, passed into the T9n's model constructor and invoked with each translation request.  Some day, the T9n model will simply be an observer of locale state and we'll dispense with the synchronous locale checks.

For now, I aggregate all the component message catalogs into ```assets/js/models/model-t9n.js``` where they merge into a single, app-level catalog.  

The [merge](https://github.com/zenglenn42/CityMatch/blob/724a502ad2b7fec4e061732e13b583cd0cda604c/assets/js/models/model-t9n.js#L27) involves a double-reduction across an array of supported locales and an array of component catalogs to produce a map of symbolic names to translated strings.  

```
  this.mergeCatalogs = (localeArray, catalogArray) => {
    let mergedCatalog = localeArray.reduce( (localeACC, locale) => {
      localeACC = { ...localeACC, [locale]:
            catalogArray.reduce( (catalogACC, catalog) => {
              catalogACC = { ...catalogACC, ...catalog[locale] }
              return catalogACC
            }, {})
      }
      return localeACC
    }, {})
    return mergedCatalog
  }
```

In a scaled-up effort, it might make sense to split out each translated catalog into its own file so new languages could be added without contention for the single file currently holding all catalogs.  Plus namespacing could be leveraged to prevent collision of symbolic names for strings.  

But the app is relatively small and it's just me at the helm so I can't really justify the effort to split that out just now.  Really wish JS had enumerated types, though.

### [I ♥️  git bisect](#contents)

No good deed goes unpunished.

Remember that cool little hardening feature wherein I gray-out the map-view button when the internet is unavailable ... and a considerate, explanatory tooltip pops up when you hover over the disabled button?

![alt](docs/img/tooltip-works)

Well, at some point, I notice a regression.  It doesn't pop-up if chart-view happens to be selected!

![alt](docs/img/tooltip-broken)

I jump into the debugger and pull up layer-view in Safari and notice that the MDL *.is-active class for the ```<div>``` never gets asserted for the tooltip on hover.  I slog around a bit, placing breakpoints in event handlers, but this really is 3rd party code which seems to be behaving poorly.  

Maybe it would be more efficient if I ...

1. Determine if this _ever_ worked (for the chart-view case).
2. If it ***did*** work earlier, determine which commit regressed things.

This is a great opportunity to bust out my friend, ```git bisect```.

Basically you find that last known good commit with the featuring working as designed.
Then you invoke ```git bisect``` iteratively to checkout the tree at intermediary commits, testing for the regression at each checkout, until you zero-in on the precise commit that's causing the regression.

My first step is finding the commit that _adds_ the gray-out feature.
A little ```git log``` tells me it's:

```
commit c9e985c637bb2a088ec85805315d692ef817c447
Date:   Wed Aug 11 14:59:39 2021 -0500

    make results page more resilient to loss of internet

    Gray-out the map view if the internet is down when the application loads
    (especially when reloading from browser cache).
```

I create a branch off this commit boundary ...

```
% git branch does-feature-work c9e985c63
% git checkout does-feature-work
```
and quickly verify the feature works as designed, even when chart-view is selected.  

This consitutes my last known ```good``` commit.

I revert back to master and start the bisecting-checkout process:

Here's what my ```git bisect`` transcript looks like:

```
% git checkout master

% git bisect start HEAD c9e985c63
Bisecting: 73 revisions left to test after this (roughly 6 steps)
[dd096f01ee047985f2ab1199c1f74d6d12474ec6] blog about parasitic recusion bug

% git bisect good
Bisecting: 36 revisions left to test after this (roughly 5 steps)
[cea5b63488e9eb9875c59c4bb58093744dd3c87d] blog about react native a bit

% git bisect bad
Bisecting: 18 revisions left to test after this (roughly 4 steps)
[d0e8195015b31b9c2bd79c520c6cab6bb69867bc] don't squash vertical dimension on chart-view in landscape mode; scroll instead

% git bisect good
Bisecting: 9 revisions left to test after this (roughly 3 steps)
[1efbd26fc7ec643f84b1aff6eae8a09bb7aa1a87] fig blog post formatting on table view

% git bisect bad
Bisecting: 4 revisions left to test after this (roughly 2 steps)
[e5d15fe1b4b0225fba4b79ede7f30f5fcafa5a68] re-add fix for nixing horiz sb on lang dropdown menu

% git bisect bad
Bisecting: 1 revision left to test after this (roughly 1 step)
[9d1fb31082093a510d1c047aa7277e7356760b43] fix compositing regression in dropdown menu

% git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[da02cc6dff4a7142ac01728ce22aa424e8315cb4] nix the headers on chart view; use floating menu instead

% git bisect bad
da02cc6dff4a7142ac01728ce22aa424e8315cb4 is the first bad commit
commit da02cc6dff4a7142ac01728ce22aa424e8315cb4
Author: Glenn Streiff <gsnospampls@pobox.com>
Date:   Mon Aug 30 11:43:17 2021 -0500

    nix the headers on chart view; use floating menu instead

    It's terribly annoying to look at a graph (especially on mobile)
    when it is scrunched between a semi-useful bottom appbar and a
    terribly-unuseful header.

    So nix the header entirely.

 assets/js/controller/controller-results.js | 6 +++---
 1 file changed, 3 insertions(+), 3 deletions(-)
```

And bingo, in about 7 steps, git helps me wade through 73 commits to find the culprit:

```commit da02cc6d   nix the headers on chart view; use floating menu instead```

***What*** was I doing in that commit?

```
% git log -p da02cc6df

@@ -148,12 +148,12 @@ Controller.prototype.addScrollEventListener = function() {
         switch (targetView) {
           case "photo": // Whitelist these views to use our custom scroll handler.
           case "table": //
+          case "chart": //
               break     // Proceed to custom scroll handling

-          case "chart": // Blacklist these views from using our custom scroll handler.
-          case "map":   // These views are not playing nicely on mobile, especially map-view
+          case "map":   // Blacklist these views from using our custom scroll handler.
+          default:      // These views are not playing nicely on mobile, especially map-view
                         // on Android.  Need better device emulation in dev env. :-)
-          default:
               return    // Bail out, no custom scroll handling.
         }
```

Ah, this is a short & sweet commit, thankfully.  Backing it out should not be an issue.  Looks like I'm just white-listing chart view to use the custom scroll handler which makes the header disappear.  We won't suffer too much functionally if I revert it.

```
% git revert da02cc6dff4
```

Now let's test again ... and 

![alt](docs/img/tooltip-fixed)

***bam***! :-) Regression fixed.  To be truly awesome, I'd delve in and figure out _why_ that innocent commit caused the grief.  But I'm feeling just semi-awesome today and know where to pick up the chase when the spirit moves.


## [Table View](#contents)

![alt](docs/img/sonja-guina-ryO9maYr4rY-unsplash.jpg)
Photo by Sonja Guina

It starts out as a modest request from a friend: ```Could you implement a table view?```

He doesn't want to see a lot of photos or fluffy chart animations, just the underlying data in a simple format.

I let the idea percolate for about a week with the following realizations:

* I'm not a huge fan of the current list view.  It has presentation issues with wrapping and clipping, making comparisons with other cities a bit muddled and tedious.  Maybe table view could be a more quant-friendly list view?

* Integration with the current UI is conceptually simple, just trade an ```<ol>``` for a ```<table>``` and map across the array of ranked city data to produce ```<tr>```'s instead of ```<li>```'s.  Maybe swap out the list icon for a table icon and hunt down references to ```list-view``` in my code and change it to ```table-view```.

* The underlying framework I'm using, [Material Design Lite](https://getmdl.io/components/index.html#tables-section), _does_ have support for clean-looking data tables with the promise of other usability wins like column sorting and multi-row selection for folks that love that spreadsheet vibe.  Heck, there's probably third party code for exporting HTML tables to Excel import-friendly CSVs.  For now, I'd just need to decorate my ```<table>``` with appropriate MDL classes to transform the markup into a spiffy matrix.

Easy-peasy ... so you know this isn't gonna end well, right? :D

### [Your table is ready](#contents)

I code up the feature in about an hour, test things in my dev environment, and play with my browser's responsive mode for emulating mobile devices in both portrait and landscape modes.  I feel sassy, like I just harvested some nutrient-dense, digital kale from my little software garden:

![alt](docs/img/list-to-table.png)

I publish to github and deploy to the world.

For good measure, I pull up the live site on my mobile to bask in the glory and take a victory lap.  Portrait orientation looks okay, but I can only see one column of data for a given city since the rest is clipped.  Sure, I can scroll-touch to the right, but then I can't compare cities against _all_ their attributes at once.  (Say what you will about list-view, the ugly wrapping allowed you to see all the data.)

So I do the sane thing, the human thing, and rotate the phone to landscape mode so I can see all the columns and ...

I realize I've created something ungood. :-/

### [But the table is small and by the kitchen](#contents)

![alt](docs/img/harm-to-table.png)

Sure, I can see all the column headers now, but there's room for just ***one*** row of city data, frustrating my ability to make proximate comparisons to other cities.  Plus the scroll region is so small, it's almost too annoying to use.

Basically, my phone's browser is consuming some of those ```100vw x 100vh``` viewport units with screen elements such as smart-search windows and bottom toolbars, exacerbating some tone-deaf design choices I'm defaulting to on mobile.

The victory lap becomes an unexpected mini-descent into the [Kübler-Ross model of grief](https://www.mcgill.ca/oss/article/health-history/its-time-let-five-stages-grief-die):

* ```denial```

Wait, this looked fine in my dev environment!

* ```anger```

Why is the phone vendor eating into all _my_ web app's precious screen real estate with their silly (ok, essential) toolbars and URL search elements?  Why can't my dev browser have better phone emulation?!

* ```bargaining```

Is there a way to programmatically strip all that vendor shizzle off so my app can have the _full_ screen?  Wait, what?  Progressive web app, you say?  Save my app to the home screen?  Will my Auntie even _know_ to do that on her own?!  What about some random stranger who doesn't know me from Adam?

* ```depression```

Ug, this is cr@p and it a'int gonna be easy to fix.  When will this stop sucking?  Why is it so hard to make something beautiful?

* ```acceptance```

Dang, my design _is_ kinda lame.  Why am I expending _1/3rd_ of the usable landscape viewport on a _dumb_ static header?  I really should track down better device emulation for my dev environment and maybe do the [BrowserStack thing](https://www.browserstack.com).  How are others solving this issue?  Even with my mobile-first ethos, I've kinda been on auto-pilot and not really noticing how well-designed sites adapt to the form-factor constraints of mobile.

### [I prefer a larger table near a window](#contents)

Three weeks later, I have a better, mobile-friendly, table-view that works on iOS and Android:

![alt](docs/img/mobile-friendly-table.png)

In my case, the new design triples the number of city rows visible in landscape mode, features scroll-away headers and a floating hamburger menu, ***and*** my bottom appbar no longer gets occluded by the mobile browser's dynamic toolbars.  It's not perfect but it's much better.

### [Lessons learned](#contents)

* Mobile is definitely its own little universe.

I feel like I've been through a rite of passage that ultimately strengthens my ability to appraise and assess ... and knock down some of those unknown unknowns.

For example, coding for orientation change is important on mobile.  Currently, I reload the app on orientation change to fix a ```dead-space``` layout issue, but that has the secondary effect of resetting the scrollTop back to the top of ```<main>```.  

So I risk disrupting the user's cognitive context after a device rotation ... especially if they're scrolled down deeply into the results.

I should _minimize_ avoidable dissonance like that.  Maybe I need a more finessed idiom (```onresize?```) that doesn't clobber ```scrollTop``` while addressing the dead-space thing __or__ possibly capture scrollTop in my view-model and persist that in some efficient way so the user's scroll context is preserved across orientation changes and even sessions.

* Some mobile best-practices can help:

  * [From Google ~2019](https://developers.google.com/web/fundamentals/design-and-ux/principles)
  * [From Impulse ~2014](https://web.archive.org/web/20151103001838/http://www.luster.io/blog/9-29-14-mobile-web-checklist.html) A bit dated, but nice, granular dev-fu.

* Viewport units (vh, vw) now trigger mild PTSD after wrangling the [100vh mobile CSS bug/feature](https://nicolas-hoizey.com/articles/2015/02/18/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers/) that was thwarting my bottom appbar.  

My innocent choice to stick a FAB in the footer way back when put me on a crash-course with this bit of webapp hazing that front-end folk have been wrestling with for years!  But it's good to know I'm [not alone](https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/).

Btw, ```width: 100%``` factors in the dimensions of scrollbars, ```width: 100vw``` does _not_.

* I need better feature detection and should probably leverage [Modernizr](https://modernizr.com/) so I can code to a more robust and resilient browser model.  This could enable, for example, cleaner code and better UX for portrait versus landscape orientations.

Cool CSS features like ```scroll-snap-type``` and ```scroll-snap-align``` might warrant different settings depending upon device orientation.  

In mobile portrait mode, where we've got enough space to view an entire city photo-card, ```scroll-snap-type: mandatory``` makes sense and feels nice and thumb-flickable.  However, in landscape mode, ```mandatory``` is overkill and actually detracts from the UX since cards may span the viewport, leaving users to curse you when the bottom content of a card snaps out of view, with slavish top-alignment.  Clearly, ```proximity``` snapping is the better choice.  I probably should create landscape-friendly city cards.  Maybe with a square-ish image on left and text on the right. Then I could bust out ```scroll-snap-type: mandatory``` for ***both*** orientations and have satisfyingly flick-worthy cards in all cases.

There's a fine line between enabling usability and good intentions that ultimately annoy.  

Scroll-away headers can be great, but twitchy, overeager, scroll-into-view headers can easily burn-off all the goodwill you engender by making them disappear initially.

* ***Always*** [turn on scrollbars when developing from macOS](https://css-tricks.com/scrollbar-reflowing/) so you can hunt down your errantly-coded ```overflow: scroll``` CSS bugs.  

I discover my results page actually had _three_ sets of scrollbars lurking there.

![alt](docs/img/scrollbar-hell.png)

* I'm getting closer to React Native

Some UI/UX patterns just don't seem available to web developers in a low-impedance, no-compromise way.  The bottom appbar is a case in point.  Sure I got my appbar fixed, but it's at the expense of a now normally-visible, 44px tall (on iOS Safari), vendor toolbar that can compromise the UX for certain devices and orientations.

Presumably [React Native](https://reactnative.dev) would give me the portability benefits of a webdev ecosystem with more of the virtues of native-app form-factor and usage patterns.  No doubt, that conjecture entails its own set of [tradeoffs](https://www.youtube.com/watch?v=E5xThvyaGbE) I have yet to fully appreciate. (-;

# [Declaring Victory](#contents)

For all the cool potential this little app has, I think it's time to move on to other projects.  
![alt](docs/img/priscilla-du-preez-tQagUWpAx5k-unsplash.jpg)
Photo by Priscilla Du Preez

I still need to make the models observable by the view for canonical MVC synchronization of state from model to view.  This would make responsive desktop easier to implement. For now, though, view updates are handled explicitly by the mediating controller on significant event boundaries using flow-synchronization as beautifully [elaborated](https://martinfowler.com/eaaDev/uiArchs.html#ModelViewController) by Martin Fowler.

## [Thanks for reading](#contents)

I may noodle around with this app at the margins, but the next big lift would probably be a full-stack rollout with React front-end.  Stay tuned and thanks for reading. (-;

It takes a tremendous amount of work and care to create something that's beautiful, functional, adaptable, and resilient whether it's a website, a relationship, or a civil society.

![alt](docs/img/toufic-mobarak-Kx2IgM3Q5jA-unsplash.jpg)
Photo by Toufic Mobarak
