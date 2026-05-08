import { listEvents, countEvents, findEventById } from "#models/events.js";
const MAX_PAGE_SIZE = 100;
/**
 * Event controller (MVC example)
 *
 * This controller intentionally demonstrates how route handlers are grouped
 * for a single domain entity inside an MVC-style backend structure.
 *
 * The trainee is not expected to already be familiar with MVC as a pattern,
 * but they are expected to continue working within the structure established
 * by this skeleton.
 *
 * For that reason, this file serves two purposes:
 * 1. provide a working example of a controller handler used in the project
 * 2. show the expected controller shape as the API grows
 *
 * Important:
 * - Not every exported handler in this file is part of the required trainee scope
 * - Some handlers are placeholders included only to demonstrate controller structure
 * - Optional placeholders should only be implemented if optional/additional
 *   project scope is explicitly taken on
 */

/**
 * GET /api/events
 *
 * Working required example of a controller-layer "list" handler.
 *
 * Query Parameters:
 * - page (number, optional, default = 0)
 *
 * Pagination Strategy:
 * - Fixed page size (PAGE_SIZE)
 * - offset = page * PAGE_SIZE
 * - totalItems calculated via countEvents()
 * - totalPages = ceil(totalItems / PAGE_SIZE)
 *
 * Response Shape:
 * {
 *   data: Array<Event>,
 *   meta: {
 *     page: number,
 *     pageSize: number,
 *     totalItems: number,
 *     totalPages: number
 *   }
 * }
 *
 * Notes:
 * - Filtering can be added later by mapping req.query -> filters object
 * - Sorting validation should be handled before passing orderBy
 */
export async function getEvents(req, res, next) {
  try {
    // 1. Strict Validation for pageSize
    let pageSize = parseInt(req.query.pageSize, 10);
    if (isNaN(pageSize) || pageSize < 1) {
      pageSize = 20; // Default to 20 if invalid
    } else if (pageSize > MAX_PAGE_SIZE) {
      pageSize = MAX_PAGE_SIZE; // Cap at 100
    }

    // 2. Strict Validation for page
    let page = parseInt(req.query.page, 10);
    if (isNaN(page) || page < 1) {
      page = 1; // Default to 1 if invalid
    }

    const offset = (page - 1) * pageSize;

    // 3. Search Filter
    const filters = {
      search: req.query.q || undefined,
    };

    // 4. Ask the Model for the data
    const data = await listEvents(filters, {
      limit: pageSize,
      offset,
      orderBy: "id",
      order: "asc",
    });

    // 5. Calculate pagination metadata
    const totalItems = await countEvents(filters);
    const totalPages = Math.ceil(totalItems / pageSize);

    // 6. Send the perfectly formatted response!
    res.json({
      data,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    });
  } catch (error) {
    next(error); // Ensure proper error scope
  }
}
/**
 * OPTIONAL STRUCTURE PLACEHOLDER
 *
 * This handler is included to demonstrate how a controller file may contain
 * additional entity actions beyond "list".
 *
 * It is NOT part of the required trainee scope unless optional/admin
 * functionality is explicitly added to the project.
 */
export async function getEventById(req, res, next) {
  try {
    const event = await findEventById(req.params.id);

    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    // This is now properly inside the try block
    res.json({ data: event });
  } catch (error) {
    next(error);
  }
}

/**
 * OPTIONAL STRUCTURE PLACEHOLDER
 *
 * This handler exists only to illustrate where a controller-layer "create"
 * action would live in the MVC structure.
 *
 * It is NOT required for the base trainee project unless optional/admin
 * scope is explicitly added.
 */
export async function postEvent(req, res, next) {
  return res.status(501).json({
    error:
      "Optional placeholder: postEvent is intentionally not implemented in the base skeleton",
  });
}

/**
 * OPTIONAL STRUCTURE PLACEHOLDER
 *
 * This handler exists only as an example of expected controller structure
 * for future entity update actions.
 *
 * It is NOT part of the required trainee implementation in the default scope.
 */
export async function patchEvent(req, res, next) {
  return res.status(501).json({
    error:
      "Optional placeholder: patchEvent is intentionally not implemented in the base skeleton",
  });
}

/**
 * OPTIONAL STRUCTURE PLACEHOLDER
 *
 * This handler exists only to illustrate where a controller-layer "delete"
 * action would be placed in the same MVC controller file.
 *
 * It is NOT part of the required trainee implementation in the default scope.
 */
export async function removeEvent(req, res, next) {
  return res.status(501).json({
    error:
      "Optional placeholder: removeEvent is intentionally not implemented in the base skeleton",
  });
}
