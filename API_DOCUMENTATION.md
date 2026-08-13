    # rotaract-cms API Documentation

    ## Base URL

    `http://localhost:1337/api`

    ## 🚀 Quick Start

    To fetch data, you almost always need to append `?populate=*` to get images and nested components.

    ```bash
    # Example: Fetch Global Settings
    curl "http://localhost:1337/api/global?populate=*"
    ```

    ---

    ## 📌 Single Types (Global Pages & Settings)

    These endpoints return a single object.

    | Content Type        | Endpoint        | Description                               |
    | :------------------ | :-------------- | :---------------------------------------- |
    | **Global Settings** | `/global`       | Site logo, Name, Footer, Social Links     |
    | **Home Page**       | `/home-page`    | Hero images, About paragraph, Gallery     |
    | **About Page**      | `/about-page`   | Hero image, Mission, Vision, Main Content |
    | **Contact Page**    | `/contact-page` | Contact info, Map embed, Hero image       |

    **Usage Example:**

    ```typescript
    const response = await fetch("http://localhost:1337/api/home-page?populate=*");
    const data = await response.json();
    console.log(data.data.heroImages);
    ```

    ---

    ## 📚 Collection Types (Lists)

    These endpoints return an array of objects.

    | Content Type       | Endpoint          | Description                          |
    | :----------------- | :---------------- | :----------------------------------- |
    | **Avenues**        | `/avenues`        | List of avenues (Club Service, etc.) |
    | **Directors**      | `/directors`      | Directors linked to avenues          |
    | **Projects**       | `/projects`       | All projects                         |
    | **Events**         | `/events`         | All events                           |
    | **Excos**          | `/excos`          | Executive Committee members          |
    | **Annual Reports** | `/annual-reports` | PDF reports                          |

    **Usage Example:**

    ```typescript
    const response = await fetch("http://localhost:1337/api/projects?populate=*");
    const data = await response.json();
    data.data.forEach((project) => console.log(project.title));
    ```

    ---

    ## 🛠 Troubleshooting & Common Pitfalls

    ### 1. 403 Forbidden / 404 Not Found

    **Cause:** The Public role doesn't have permission to view this content.
    **Fix:**

    1. Go to **Strapi Admin Panel** > **Settings** > **Users & Permissions Plugin** > **Roles**.
    2. Click **Public**.
    3. Scroll to the Permissions section.
    4. For the content type (e.g., `Global`), check **find** (and **findOne** if available).
    5. Click **Save**.

    ### 2. Content is Null / "Not Found" despite 200 OK

    **Cause:** The content is in **Draft** state.
    **Fix:**

    1. Go to the **Content Manager**.
    2. Edit the entry (e.g., Global).
    3. Click the **Publish** button in the top right.
    4. _Note: Draft content is not visible to the Public API._

    ### 3. Missing Images or Nested Data

    **Cause:** You forgot `?populate=*`.
    **Fix:** Always append `?populate=*` to your API calls.

    - Basic: `?populate=*`
    - Deep Nested: `?populate[0]=header&populate[1]=header.links` (for complex nesting, though `*` usually covers 1 level deep).

    ### 4. Admin Panel Warnings

    **Issue:** Console shows "Module 'path' has been externalized" or "React does not recognize isActive".
    **Status:** **Safe to Ignore.**
    **Explanation:** These are internal development warnings from the Strapi Admin UI build process. They do not affect your API or frontend application.
